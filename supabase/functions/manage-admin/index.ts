// Supabase Edge Function: manage-admin
// Dedicated Edge function for Super Admin Team Management and Activity Auditing

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

interface ManageAdminRequest {
  action?: 
    | 'list_admins'
    | 'register_admin'
    | 'toggle_admin_active'
    | 'reset_admin_password'
    | 'delete_admin'
    | 'get_activity_log'
    | 'log_activity';
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  admin_id?: string;
  active?: boolean;
  activity_action?: string;
  activity_target?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse({
        success: false,
        error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment configuration."
      }, 500);
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({
        success: false,
        error: "Missing authorization header. Please log in as administrator."
      }, 401);
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user: callerUser }, error: callerError } = await supabaseAdmin.auth.getUser(token);

    if (callerError || !callerUser) {
      return jsonResponse({
        success: false,
        error: "Unauthorized access token. Please sign in again."
      }, 401);
    }

    const { data: callerProfile } = await supabaseAdmin
      .from("profiles")
      .select("id, name, email, phone, role, active, is_active")
      .eq("id", callerUser.id)
      .single();

    const callerRole = callerProfile?.role;
    const callerEmail = (callerUser.email || callerProfile?.email || "").toLowerCase().trim();
    const isCallerActive = callerProfile?.active !== false && callerProfile?.is_active !== false;

    if (!isCallerActive) {
      return jsonResponse({
        success: false,
        error: "Your account is disabled. Contact the Svvayam owner."
      }, 403);
    }

    // Only marketing@svvayam.com or role = 'super_admin' is super admin
    const isSuperAdmin = callerRole === "super_admin" || callerEmail === "marketing@svvayam.com";

    const payload: ManageAdminRequest = await req.json();
    const action = payload.action || 'list_admins';

    async function recordActivity(actName: string, actTarget?: string) {
      try {
        await supabaseAdmin.from("admin_activity").insert({
          actor_id: callerUser.id,
          actor_name: callerProfile?.name || "Super Admin",
          action: actName,
          target: actTarget || null,
          created_at: new Date().toISOString()
        });
      } catch (err) {
        console.warn("Audit logging warning:", err);
      }
    }

    // Block non-super_admin from team management
    if (action !== 'log_activity' && !isSuperAdmin) {
      return jsonResponse({
        success: false,
        error: "Forbidden. Super administrator privilege required for team management."
      }, 403);
    }

    // 1. LIST ADMINS
    if (action === 'list_admins') {
      const { data: adminProfiles, error: profErr } = await supabaseAdmin
        .from("profiles")
        .select("id, name, email, phone, role, active, is_active, must_change_password, created_at")
        .in("role", ["admin", "super_admin"])
        .order("created_at", { ascending: false });

      if (profErr) {
        return jsonResponse({ success: false, error: profErr.message }, 500);
      }

      let authUserMap: Record<string, any> = {};
      try {
        const { data: { users } } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        if (users) {
          users.forEach(u => {
            authUserMap[u.id] = u;
          });
        }
      } catch (e) {
        console.warn("Could not list auth users:", e);
      }

      const mergedAdmins = (adminProfiles || []).map(p => {
        const authUser = authUserMap[p.id];
        const effectiveEmail = p.email || authUser?.email || (p.role === 'super_admin' ? 'marketing@svvayam.com' : '');
        return {
          id: p.id,
          name: p.name || 'Unnamed Admin',
          email: effectiveEmail,
          phone: p.phone,
          role: p.role,
          active: p.active !== false && p.is_active !== false,
          must_change_password: Boolean(p.must_change_password),
          last_sign_in_at: authUser?.last_sign_in_at || null,
          created_at: p.created_at || authUser?.created_at || new Date().toISOString()
        };
      });

      return jsonResponse({ success: true, admins: mergedAdmins }, 200);
    }

    // 2. REGISTER ADMIN (Email + Password)
    if (action === 'register_admin') {
      const rawName = (payload.name || "").trim();
      const rawEmail = (payload.email || "").trim().toLowerCase();
      const rawPassword = (payload.password || "").trim();

      if (!rawName) {
        return jsonResponse({ success: false, error: "Administrator full name is required." }, 400);
      }
      if (!rawEmail || !rawEmail.includes("@") || !rawEmail.includes(".")) {
        return jsonResponse({ success: false, error: "A valid email address is required." }, 400);
      }
      if (rawEmail === "marketing@svvayam.com") {
        return jsonResponse({ success: false, error: "Cannot create another super administrator account." }, 400);
      }
      if (!rawPassword || rawPassword.length < 10) {
        return jsonResponse({ success: false, error: "Temporary password must be at least 10 characters." }, 400);
      }

      const hasLetter = /[a-zA-Z]/.test(rawPassword);
      const hasNumber = /\d/.test(rawPassword);
      const hasSymbol = /[^a-zA-Z0-9\s]/.test(rawPassword);
      if (!hasLetter || !hasNumber || !hasSymbol) {
        return jsonResponse({ success: false, error: "Password must contain at least one letter, one number, and one symbol." }, 400);
      }

      // Check if user already exists in profiles
      const { data: existingProf } = await supabaseAdmin
        .from("profiles")
        .select("id, name, email, role")
        .ilike("email", rawEmail)
        .limit(1)
        .maybeSingle();

      if (existingProf) {
        return jsonResponse({
          success: false,
          code: "ADMIN_EXISTS",
          error: "An account with this email address already exists."
        }, 409);
      }

      // Create admin auth user in Supabase Auth
      const { data: createdAuth, error: createAuthErr } = await supabaseAdmin.auth.admin.createUser({
        email: rawEmail,
        email_confirm: true,
        password: rawPassword,
        user_metadata: {
          name: rawName,
          role: "admin",
          must_change_password: true
        }
      });

      if (createAuthErr || !createdAuth.user) {
        const errMsg = createAuthErr?.message || "Failed to create administrator login credentials.";
        if (errMsg.toLowerCase().includes("already") || errMsg.toLowerCase().includes("registered")) {
          return jsonResponse({
            success: false,
            code: "ADMIN_EXISTS",
            error: "An account with this email address already exists."
          }, 409);
        }
        return jsonResponse({
          success: false,
          error: errMsg
        }, 400);
      }

      const adminUserId = createdAuth.user.id;

      // Upsert profile
      const { error: profileErr } = await supabaseAdmin
        .from("profiles")
        .upsert({
          id: adminUserId,
          name: rawName,
          email: rawEmail,
          role: "admin",
          active: true,
          is_active: true,
          must_change_password: true
        }, { onConflict: "id" });

      if (profileErr) {
        await supabaseAdmin.auth.admin.deleteUser(adminUserId);
        return jsonResponse({ success: false, error: profileErr.message }, 500);
      }

      await recordActivity("admin_created", `${rawName} (${rawEmail})`);

      return jsonResponse({
        success: true,
        message: "Administrator account created successfully.",
        admin: {
          id: adminUserId,
          name: rawName,
          email: rawEmail,
          role: "admin",
          active: true,
          must_change_password: true
        }
      }, 201);
    }

    // 3. TOGGLE ADMIN ACTIVE (Disable / Enable)
    if (action === 'toggle_admin_active') {
      const targetAdminId = payload.admin_id;
      const newActive = payload.active !== undefined ? Boolean(payload.active) : false;

      if (!targetAdminId) return jsonResponse({ success: false, error: "admin_id is required." }, 400);
      if (targetAdminId === callerUser.id) {
        return jsonResponse({ success: false, error: "You cannot disable your own administrator account." }, 400);
      }

      const { data: targetProf } = await supabaseAdmin
        .from("profiles")
        .select("id, name, email, phone, role")
        .eq("id", targetAdminId)
        .single();

      if (!targetProf) return jsonResponse({ success: false, error: "Administrator not found." }, 404);
      if (targetProf.email?.toLowerCase() === "marketing@svvayam.com" || targetProf.role === "super_admin") {
        return jsonResponse({ success: false, error: "Super Administrator account cannot be disabled." }, 400);
      }

      await supabaseAdmin
        .from("profiles")
        .update({ active: newActive, is_active: newActive })
        .eq("id", targetAdminId);

      try {
        await supabaseAdmin.auth.admin.updateUserById(targetAdminId, {
          ban_duration: newActive ? "none" : "876000h"
        });
      } catch (e) {
        console.warn("Auth ban error:", e);
      }

      await recordActivity(
        newActive ? "admin_enabled" : "admin_disabled",
        `${targetProf.name || 'Admin'} (${targetProf.email || targetProf.phone || targetAdminId})`
      );

      return jsonResponse({
        success: true,
        message: `Administrator ${targetProf.name || targetAdminId} has been ${newActive ? "enabled" : "disabled"} successfully.`,
        active: newActive
      }, 200);
    }

    // 4. RESET ADMIN PASSWORD
    if (action === 'reset_admin_password') {
      const targetAdminId = payload.admin_id;
      const rawPassword = (payload.password || "").trim();

      if (!targetAdminId || !rawPassword) {
        return jsonResponse({ success: false, error: "admin_id and new password are required." }, 400);
      }
      if (rawPassword.length < 10) {
        return jsonResponse({ success: false, error: "Temporary password must be at least 10 characters." }, 400);
      }

      const { data: targetProf } = await supabaseAdmin
        .from("profiles")
        .select("id, name, email, phone, role")
        .eq("id", targetAdminId)
        .single();

      if (!targetProf) return jsonResponse({ success: false, error: "Administrator not found." }, 404);

      const { error: authErr } = await supabaseAdmin.auth.admin.updateUserById(
        targetAdminId,
        { password: rawPassword }
      );

      if (authErr) return jsonResponse({ success: false, error: authErr.message }, 400);

      await supabaseAdmin
        .from("profiles")
        .update({ must_change_password: true })
        .eq("id", targetAdminId);

      await recordActivity("admin_password_reset", `${targetProf.name || 'Admin'} (${targetProf.email || targetProf.phone})`);

      return jsonResponse({
        success: true,
        message: "Temporary password set successfully. Admin will be prompted to change it on next login."
      }, 200);
    }

    // 5. DELETE ADMIN
    if (action === 'delete_admin') {
      const targetAdminId = payload.admin_id;
      if (!targetAdminId) return jsonResponse({ success: false, error: "admin_id is required." }, 400);
      if (targetAdminId === callerUser.id) {
        return jsonResponse({ success: false, error: "You cannot delete your own administrator account." }, 400);
      }

      const { data: targetProf } = await supabaseAdmin
        .from("profiles")
        .select("id, name, email, phone, role")
        .eq("id", targetAdminId)
        .single();

      if (!targetProf) return jsonResponse({ success: false, error: "Administrator not found." }, 404);
      if (targetProf.email?.toLowerCase() === "marketing@svvayam.com" || targetProf.role === "super_admin") {
        return jsonResponse({ success: false, error: "Super Administrator account cannot be deleted." }, 400);
      }

      await supabaseAdmin.from("profiles").delete().eq("id", targetAdminId);
      await supabaseAdmin.auth.admin.deleteUser(targetAdminId);

      await recordActivity("admin_deleted", `${targetProf.name || 'Admin'} (${targetProf.email || targetProf.phone})`);

      return jsonResponse({
        success: true,
        message: `Administrator ${targetProf.name || targetAdminId} deleted successfully.`
      }, 200);
    }

    // 6. GET ACTIVITY LOG
    if (action === 'get_activity_log') {
      const { data: logRecords, error: logErr } = await supabaseAdmin
        .from("admin_activity")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (logErr) return jsonResponse({ success: false, error: logErr.message }, 500);
      return jsonResponse({ success: true, logs: logRecords || [] }, 200);
    }

    // 7. LOG ACTIVITY
    if (action === 'log_activity') {
      const actAction = payload.activity_action || 'login';
      const actTarget = payload.activity_target || null;
      await recordActivity(actAction, actTarget);
      return jsonResponse({ success: true }, 200);
    }

    return jsonResponse({ success: false, error: `Unknown action: ${action}` }, 400);
  } catch (error: any) {
    return jsonResponse({
      success: false,
      error: error.message || "An unexpected error occurred."
    }, 500);
  }
});
