import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, isFirebaseConfigured, auth } from './config';
import type { AdminUserRecord, AdminActivityRecord } from '../../types/consultation';
import { SUPER_ADMIN_EMAIL } from './authService';

/**
 * Fetches all administrators.
 */
export async function listAdminUsers(): Promise<AdminUserRecord[]> {
  if (!isFirebaseConfigured || !db) {
    return [
      {
        id: 'admin-super-001',
        name: 'Svvayam Super Admin',
        email: SUPER_ADMIN_EMAIL,
        phone: '+918074257384',
        role: 'super_admin',
        active: true,
        must_change_password: false,
        created_at: new Date().toISOString()
      }
    ];
  }

  try {
    const colRef = collection(db, 'profiles');
    const q = query(colRef, where('role', 'in', ['admin', 'super_admin']));
    const snap = await getDocs(q);

    const admins: AdminUserRecord[] = [];
    snap.forEach(d => {
      const data = d.data();
      admins.push({
        id: d.id,
        name: data.name || 'Admin',
        email: data.email || '',
        phone: data.phone || '',
        role: (data.email === SUPER_ADMIN_EMAIL ? 'super_admin' : (data.role || 'admin')) as 'admin' | 'super_admin',
        active: data.active !== false && data.is_active !== false,
        must_change_password: Boolean(data.must_change_password),
        created_at: data.created_at?.toDate?.() ? data.created_at.toDate().toISOString() : (data.created_at || new Date().toISOString())
      });
    });

    return admins;
  } catch (err) {
    console.warn('[Firestore] listAdminUsers error:', err);
    return [];
  }
}

/**
 * Toggles an administrator's active status (Instant Lockout).
 */
export async function toggleAdminActiveStatus(
  adminId: string,
  newActive: boolean,
  actor?: { id: string; name: string }
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return true;

  try {
    const profRef = doc(db, 'profiles', adminId);
    await updateDoc(profRef, {
      active: newActive,
      is_active: newActive,
      updated_at: serverTimestamp()
    });

    await logAdminActivity({
      actorId: actor?.id || auth?.currentUser?.uid || 'system',
      actorName: actor?.name || auth?.currentUser?.email || 'Super Admin',
      action: newActive ? 'admin_enabled' : 'admin_disabled',
      target: `Admin ID: ${adminId} (${newActive ? 'Enabled' : 'Disabled / Locked out'})`
    });

    return true;
  } catch (err) {
    console.error('[Firestore] toggleAdminActiveStatus error:', err);
    return false;
  }
}

/**
 * Deletes an administrator account.
 */
export async function deleteAdminUser(
  adminId: string,
  actor?: { id: string; name: string }
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) return true;

  try {
    const profRef = doc(db, 'profiles', adminId);
    await deleteDoc(profRef);

    await logAdminActivity({
      actorId: actor?.id || auth?.currentUser?.uid || 'system',
      actorName: actor?.name || auth?.currentUser?.email || 'Super Admin',
      action: 'admin_deleted',
      target: `Deleted admin ID: ${adminId}`
    });

    return true;
  } catch (err) {
    console.error('[Firestore] deleteAdminUser error:', err);
    return false;
  }
}

/**
 * Fetches append-only admin activity log.
 */
export async function fetchAdminActivityLogs(): Promise<AdminActivityRecord[]> {
  if (!isFirebaseConfigured || !db) return [];

  try {
    const colRef = collection(db, 'admin_activity');
    const q = query(colRef, orderBy('created_at', 'desc'), limit(100));
    const snap = await getDocs(q);

    const logs: AdminActivityRecord[] = [];
    snap.forEach(d => {
      const data = d.data();
      logs.push({
        id: d.id,
        actor_id: data.actor_id,
        actor_name: data.actor_name || 'System',
        action: data.action,
        target: data.target,
        created_at: data.created_at?.toDate?.() ? data.created_at.toDate().toISOString() : new Date().toISOString()
      });
    });

    return logs;
  } catch (err) {
    console.warn('[Firestore] fetchAdminActivityLogs error:', err);
    return [];
  }
}

/**
 * Appends an audit log entry to admin_activity collection.
 */
export async function logAdminActivity(entry: {
  actorId?: string;
  actorName?: string;
  action: string;
  target?: string;
  metadata?: any;
}): Promise<void> {
  if (!isFirebaseConfigured || !db) return;

  try {
    const colRef = collection(db, 'admin_activity');
    await addDoc(colRef, {
      actor_id: entry.actorId || null,
      actor_name: entry.actorName || 'Admin',
      action: entry.action,
      target: entry.target || '',
      metadata: entry.metadata || null,
      created_at: serverTimestamp()
    });
  } catch (err) {
    console.warn('[Firestore] logAdminActivity warning:', err);
  }
}

/**
 * Creates a new administrator account in Firebase Auth + Firestore without logging out current staff.
 */
export async function createAdminUserIsolated(params: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  actor?: { id: string; name: string };
}): Promise<{ success: boolean; userId?: string; error?: string }> {
  const cleanEmail = params.email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid administrator email address.' };
  }
  if (!params.password || params.password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  if (!isFirebaseConfigured || !db) {
    return { success: true, userId: 'local-admin-' + Date.now() };
  }

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  };

  const secondaryAppName = `AdminProvision_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  let secondaryApp = null;
  try {
    secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
    const secondaryAuth = getAuth(secondaryApp);
    const userCred = await createUserWithEmailAndPassword(secondaryAuth, cleanEmail, params.password);
    const newUid = userCred.user.uid;

    await signOut(secondaryAuth);
    await deleteApp(secondaryApp);
    secondaryApp = null;

    // Create profile in Firestore
    const profRef = doc(db, 'profiles', newUid);
    await setDoc(profRef, {
      id: newUid,
      name: params.name.trim(),
      email: cleanEmail,
      phone: params.phone || '',
      role: 'admin',
      active: true,
      is_active: true,
      must_change_password: true,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    }, { merge: true });

    await logAdminActivity({
      actorId: params.actor?.id || auth?.currentUser?.uid || 'super-admin',
      actorName: params.actor?.name || auth?.currentUser?.email || 'Super Admin',
      action: 'admin_created',
      target: `Provisioned admin account for ${cleanEmail}`
    });

    return { success: true, userId: newUid };
  } catch (err: any) {
    if (secondaryApp) {
      try { await deleteApp(secondaryApp); } catch {}
    }
    console.error('[Firebase Auth] createAdminUserIsolated error:', err);
    return { success: false, error: err?.message || 'Failed to create administrator account.' };
  }
}
