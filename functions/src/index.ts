import { onRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import { defaultPortfolioService } from "./portfolioBackend";
import { ProjectCatalogSyncEngine } from "./syncEngine";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();
const auth = admin.auth();

const SUPER_ADMIN_EMAIL = "marketing@svvayam.com";

/**
 * Trusted server-side customer registration.
 * Creates customer in Firebase Auth, creates/updates Firestore profile & project.
 * Enforces that caller must be an authorized admin.
 */
export const registerCustomer = onRequest({ cors: true, region: "asia-south1" }, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ success: false, error: "Missing authorization token." });
      return;
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decoded = await auth.verifyIdToken(idToken);
    const callerUid = decoded.uid;

    // Verify caller is active admin in Firestore
    const callerDoc = await db.collection("profiles").doc(callerUid).get();
    const callerData = callerDoc.data();
    const isCallerAdmin = callerData && (callerData.role === "admin" || callerData.role === "super_admin") && callerData.active !== false;

    if (!isCallerAdmin) {
      res.status(403).json({ success: false, error: "Caller is not authorized to register clients." });
      return;
    }

    const {
      name,
      phone,
      password,
      title = "Mr.",
      surname = "",
      product = "Temple",
      project_name = "",
      location = "India"
    } = req.body || {};

    if (!phone || !password || !name) {
      res.status(400).json({ success: false, error: "Name, phone, and password are required." });
      return;
    }

    const cleanDigits = phone.replace(/\D/g, "").slice(-10);
    const internalEmail = `${cleanDigits}@svvayam.internal`;
    const formattedPhone = "+91" + cleanDigits;

    // Create or retrieve Auth user
    let userRecord;
    try {
      userRecord = await auth.createUser({
        email: internalEmail,
        password: password.trim(),
        displayName: name.trim(),
        disabled: false
      });
    } catch (createErr: any) {
      if (createErr.code === "auth/email-already-exists") {
        userRecord = await auth.getUserByEmail(internalEmail);
      } else {
        throw createErr;
      }
    }

    const customerUserId = userRecord.uid;

    // Create/update profile document
    const profRef = db.collection("profiles").doc(customerUserId);
    await profRef.set({
      id: customerUserId,
      name: name.trim(),
      phone: formattedPhone,
      email: internalEmail,
      role: "customer",
      title,
      surname,
      product,
      project_name,
      location,
      active: true,
      is_active: true,
      must_change_password: false,
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    // Create project document
    const projId = "proj-" + customerUserId;
    const projRef = db.collection("projects").doc(projId);
    await projRef.set({
      id: projId,
      client_id: customerUserId,
      project_name,
      product_type: product,
      location,
      status: "draft",
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    // Log admin activity
    await db.collection("admin_activity").add({
      actor_id: callerUid,
      actor_name: callerData?.name || "Admin",
      action: "customer_created",
      target: `Registered customer: ${name.trim()} (${formattedPhone}) - Project: ${project_name}`,
      created_at: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).json({
      success: true,
      customer: {
        id: customerUserId,
        name: name.trim(),
        phone: formattedPhone,
        project_name,
        project_id: projId
      }
    });
  } catch (err: any) {
    console.error("registerCustomer error:", err);
    res.status(500).json({ success: false, error: err.message || "Failed to register customer." });
  }
});

/**
 * Trusted server-side admin management for Super Admin.
 */
export const manageAdmin = onRequest({ cors: true, region: "asia-south1" }, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ success: false, error: "Missing authorization token." });
      return;
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decoded = await auth.verifyIdToken(idToken);
    const callerUid = decoded.uid;

    const callerDoc = await db.collection("profiles").doc(callerUid).get();
    const callerData = callerDoc.data();
    const isSuper = callerData?.email === SUPER_ADMIN_EMAIL || callerData?.role === "super_admin";

    if (!isSuper) {
      res.status(403).json({ success: false, error: "Super Admin authorization required." });
      return;
    }

    const { action, name, email, phone, password, admin_id, active } = req.body || {};

    if (action === "list_admins") {
      const snap = await db.collection("profiles").where("role", "in", ["admin", "super_admin"]).get();
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      res.status(200).json({ success: true, admins: list });
      return;
    }

    if (action === "register_admin") {
      if (!email || !password || !name) {
        res.status(400).json({ success: false, error: "Name, email, and password required." });
        return;
      }
      const cleanEmail = email.trim().toLowerCase();
      const userRecord = await auth.createUser({
        email: cleanEmail,
        password: password.trim(),
        displayName: name.trim()
      });

      await db.collection("profiles").doc(userRecord.uid).set({
        id: userRecord.uid,
        name: name.trim(),
        email: cleanEmail,
        phone: phone || "",
        role: "admin",
        active: true,
        is_active: true,
        must_change_password: true,
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });

      await db.collection("admin_activity").add({
        actor_id: callerUid,
        actor_name: callerData?.name || "Super Admin",
        action: "admin_created",
        target: `Created staff admin: ${name.trim()} (${cleanEmail})`,
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(200).json({ success: true, admin_id: userRecord.uid });
      return;
    }

    if (action === "toggle_admin_active") {
      if (!admin_id) {
        res.status(400).json({ success: false, error: "admin_id required." });
        return;
      }
      await db.collection("profiles").doc(admin_id).update({
        active: Boolean(active),
        is_active: Boolean(active),
        updated_at: admin.firestore.FieldValue.serverTimestamp()
      });

      await db.collection("admin_activity").add({
        actor_id: callerUid,
        actor_name: callerData?.name || "Super Admin",
        action: active ? "admin_enabled" : "admin_disabled",
        target: `Toggled admin active: ${admin_id} to ${active}`,
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(200).json({ success: true });
      return;
    }

    if (action === "reset_admin_password") {
      if (!admin_id || !password) {
        res.status(400).json({ success: false, error: "admin_id and password required." });
        return;
      }
      await auth.updateUser(admin_id, { password: password.trim() });
      await db.collection("profiles").doc(admin_id).update({
        must_change_password: true,
        updated_at: admin.firestore.FieldValue.serverTimestamp()
      });

      await db.collection("admin_activity").add({
        actor_id: callerUid,
        actor_name: callerData?.name || "Super Admin",
        action: "admin_password_reset",
        target: `Reset password for admin: ${admin_id}`,
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(200).json({ success: true });
      return;
    }

    res.status(400).json({ success: false, error: "Unknown action." });
  } catch (err: any) {
    console.error("manageAdmin error:", err);
    res.status(500).json({ success: false, error: err.message || "Failed to manage admin." });
  }
});

/**
 * Explicit runtime service account for least-privilege cloud execution.
 * Grants read access to Google Drive & Google Sheets and write access to Firestore & Cloud Storage.
 */
export const RUNTIME_SERVICE_ACCOUNT = process.env.SYNC_SERVICE_ACCOUNT || "live-consultation@appspot.gserviceaccount.com";

/**
 * Read-Only Federated Catalog Endpoint.
 * Serves portfolio projects matched between Google Sheets and Google Drive with 60s in-memory caching.
 * Does not mirror into Firestore or write to Firebase Cloud Storage.
 */
export const portfolioCatalog = onRequest({
  cors: true,
  region: "asia-south1",
  serviceAccount: RUNTIME_SERVICE_ACCOUNT,
  memory: "512MiB"
}, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed. Use GET." });
    return;
  }

  try {
    const forceRefresh = req.query.refresh === "true";
    const catalog = await defaultPortfolioService.getCatalog(forceRefresh);
    res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=120");
    res.status(200).json(catalog);
  } catch (err: any) {
    console.error("[portfolioCatalog] error:", err);
    res.status(500).json({ error: "Failed to build portfolio catalog.", details: err.message });
  }
});

/**
 * Secure On-Demand Google Drive Image Streaming Endpoint.
 * Streams images directly from Google Drive API with caching headers.
 * Restricts access strictly to files in approved project folders under the configured Drive root.
 */
export const portfolioImage = onRequest({
  cors: true,
  region: "asia-south1",
  serviceAccount: RUNTIME_SERVICE_ACCOUNT,
  memory: "512MiB"
}, async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed. Use GET." });
    return;
  }

  const fileId = req.query.fileId as string;
  if (!fileId) {
    res.status(400).json({ error: "fileId query parameter is required." });
    return;
  }

  try {
    await defaultPortfolioService.streamDriveImage(fileId, res);
  } catch (err: any) {
    console.error("[portfolioImage] error:", err);
    res.status(500).json({ error: "Failed to stream image.", details: err.message });
  }
});

/**
 * 3. Drive Webhook endpoint for real-time push notifications
 */
export const handleDriveWebhook = onRequest({
  cors: true,
  region: "asia-south1",
  serviceAccount: RUNTIME_SERVICE_ACCOUNT,
  memory: "512MiB"
}, async (req, res) => {
  const resourceState = req.headers["x-goog-resource-state"];

  // Immediate handshake response for channel verification
  if (resourceState === "sync") {
    res.status(200).send("Drive notification channel active");
    return;
  }

  try {
    const engine = new ProjectCatalogSyncEngine(db);
    const report = await engine.executeSync({ trigger: "webhook" });
    res.status(200).json({ success: true, report });
  } catch (err: any) {
    console.error("handleDriveWebhook error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * 4. 15-Minute Backup Scheduler for Sheet edits and missed notifications
 * Also verifies and renews Google Drive webhook watch channel before expiration.
 */
export const syncBackupCheck = onSchedule({
  schedule: "every 15 minutes",
  timeZone: "Asia/Kolkata",
  region: "asia-south1",
  serviceAccount: RUNTIME_SERVICE_ACCOUNT,
  retryCount: 1,
  memory: "512MiB"
}, async () => {
  console.log("[Scheduler] Executing 15-minute catalog backup check...");
  const engine = new ProjectCatalogSyncEngine(db);

  // 1. Check and automatically renew Drive push notification subscription if near expiry (<48h)
  const webhookCallback = process.env.WEBHOOK_CALLBACK_URL || "https://asia-south1-live-consultation.cloudfunctions.net/handleDriveWebhook";
  await engine.ensureWebhookChannelActive(webhookCallback);

  // 2. Run delta synchronization
  const report = await engine.executeSync({ trigger: "backup_check" });
  console.log(`[Scheduler] Backup completed: Added ${report.addedProjects.length}, Updated ${report.updatedMetadata.length}, Errors: ${report.errors.length}`);
});

/**
 * 5. Manual Sync Endpoint strictly requiring authorized staff admin credentials
 */
export const manualCatalogSync = onRequest({
  cors: true,
  region: "asia-south1",
  serviceAccount: RUNTIME_SERVICE_ACCOUNT,
  memory: "512MiB"
}, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
    return;
  }

  try {
    // Enforce strict staff authentication
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ success: false, error: "Authentication required. Bearer ID token is missing." });
      return;
    }

    const idToken = authHeader.split("Bearer ")[1];
    let decoded;
    try {
      decoded = await auth.verifyIdToken(idToken);
    } catch (tokenErr: any) {
      res.status(401).json({ success: false, error: "Invalid or expired authorization token." });
      return;
    }

    const callerDoc = await db.collection("profiles").doc(decoded.uid).get();
    const callerData = callerDoc.data();
    const isStaffAdmin = callerData && (callerData.role === "admin" || callerData.role === "super_admin") && callerData.active !== false;

    if (!isStaffAdmin) {
      res.status(403).json({ success: false, error: "Access denied. Only authorized staff administrators can invoke manual catalog sync." });
      return;
    }

    const { dryRun = false } = req.body || {};
    const engine = new ProjectCatalogSyncEngine(db);
    const report = await engine.executeSync({ trigger: "manual", dryRun: Boolean(dryRun) });
    res.status(200).json({ success: true, report });
  } catch (err: any) {
    console.error("manualCatalogSync error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
