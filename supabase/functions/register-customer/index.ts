// Supabase Edge Function: register-customer
// Admin & Super Admin lifecycle management
// Handles customer registration, admin management, role verification, and append-only activity auditing.
// Service Role Key is kept strictly within function environment secrets.

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

interface RegisterRequest {
  action?: 
    | 'register' 
    | 'deactivate' 
    | 'reset_password' 
    | 'register_admin' 
    | 'delete_consultation'
    | 'list_admins'
    | 'toggle_admin_active'
    | 'reset_admin_password'
    | 'delete_admin'
    | 'get_activity_log'
    | 'log_activity';
  role?: 'client' | 'admin' | 'super_admin';
  name?: string;
  phone?: string;
  password?: string;
  title?: string;
  surname?: string;
  product?: string;
  project_name?: string;
  location?: string;
  consultation_id?: string;
  create_new_consultation?: boolean;
  customer_id?: string;
  admin_id?: string;
  active?: boolean;
  is_active?: boolean;
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
        error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment configuration. Please set function secrets."
      }, 500);
    }

    // Initialize admin client with service role key (functions secret)
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // 1. Verify caller authorization (must be logged-in admin or super_admin)
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

    // Check caller profile & role from profiles table
    const { data: callerProfile } = await supabaseAdmin
      .from("profiles")
      .select("id, name, phone, role, active, is_active")
      .eq("id", callerUser.id)
      .single();

    const callerRole = callerProfile?.role;
    const isCallerActive = callerProfile?.active !== false && callerProfile?.is_active !== false;

    if (!isCallerActive) {
      return jsonResponse({
        success: false,
        error: "Your account is disabled. Contact the Svvayam owner."
      }, 403);
    }

    if (callerRole !== "admin" && callerRole !== "super_admin") {
      return jsonResponse({
        success: false,
        error: "Forbidden. Admin access required."
      }, 403);
    }

    const isSuperAdmin = callerRole === "super_admin";

    const payload: RegisterRequest = await req.json();
    const action = payload.action || 'register';

    // Helper: log activity to append-only admin_activity table
    async function recordActivity(actName: string, actTarget?: string) {
      try {
        await supabaseAdmin.from("admin_activity").insert({
          actor_id: callerUser.id,
          actor_name: callerProfile?.name || "Svvayam Admin",
          action: actName,
          target: actTarget || null,
          created_at: new Date().toISOString()
        });
      } catch (err) {
        console.warn("Audit logging warning:", err);
      }
    }

    // =========================================================================
    // SUPER ADMIN ONLY ACTIONS: list_admins, register_admin, toggle_admin_active, reset_admin_password, delete_admin, get_activity_log
    // =========================================================================

    const superAdminOnlyActions = [
      'list_admins',
      'register_admin',
      'toggle_admin_active',
      'reset_admin_password',
      'delete_admin',
      'get_activity_log'
    ];

    if (superAdminOnlyActions.includes(action) && !isSuperAdmin) {
      return jsonResponse({
        success: false,
        error: "Forbidden. Super administrator privilege required for this action."
      }, 403);
    }

    // ACTION: List all Admins (Super Admin only)
    if (action === 'list_admins') {
      const { data: adminProfiles, error: profErr } = await supabaseAdmin
        .from("profiles")
        .select("id, name, phone, role, active, is_active, must_change_password, created_at")
        .in("role", ["admin", "super_admin"])
        .order("created_at", { ascending: false });

      if (profErr) {
        return jsonResponse({ success: false, error: profErr.message }, 500);
      }

      // Fetch user metadata/last_sign_in_at from auth.users
      let authUserMap: Record<string, any> = {};
      try {
        const { data: { users } } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        if (users) {
          users.forEach(u => {
            authUserMap[u.id] = u;
          });
        }
      } catch (e) {
        console.warn("Could not list auth users for last_sign_in_at:", e);
      }

      const mergedAdmins = (adminProfiles || []).map(p => {
        const authUser = authUserMap[p.id];
        return {
          id: p.id,
          name: p.name || 'Unnamed Admin',
          phone: p.phone,
          role: p.role,
          active: p.active !== false && p.is_active !== false,
          must_change_password: Boolean(p.must_change_password),
          last_sign_in_at: authUser?.last_sign_in_at || null,
          created_at: p.created_at || authUser?.created_at || new Date().toISOString()
        };
      });

      return jsonResponse({
        success: true,
        admins: mergedAdmins
      }, 200);
    }

    // ACTION: Register Administrator (Super Admin only)
    if (action === 'register_admin') {
      const rawName = (payload.name || "").trim();
      const rawPhone = (payload.phone || "").trim();
      const rawPassword = (payload.password || "").trim();

      if (!rawName) {
        return jsonResponse({ success: false, error: "Administrator full name is required." }, 400);
      }
      if (!rawPhone) {
        return jsonResponse({ success: false, error: "Mobile number is required." }, 400);
      }

      const cleanDigits10 = rawPhone.replace(/\D/g, "").slice(-10);
      if (cleanDigits10.length !== 10) {
        return jsonResponse({ success: false, error: "Phone number must be a valid 10-digit mobile number." }, 400);
      }
      const normalizedPhone = "+91" + cleanDigits10;
      const hiddenEmail = `${cleanDigits10}@svvayam.internal`;

      if (!rawPassword || rawPassword.length < 8) {
        return jsonResponse({ success: false, error: "Temporary password must be at least 8 characters." }, 400);
      }

      // Check if user already exists in profiles
      const { data: existingProf } = await supabaseAdmin
        .from("profiles")
        .select("id, name, phone, role")
        .or(`phone.eq.${normalizedPhone},phone.ilike.%${cleanDigits10}%`)
        .limit(1)
        .maybeSingle();

      if (existingProf) {
        return jsonResponse({
          success: false,
          code: "ADMIN_EXISTS",
          error: "An account with this mobile number already exists."
        }, 409);
      }

      // Create admin auth user
      const { data: createdAuth, error: createAuthErr } = await supabaseAdmin.auth.admin.createUser({
        email: hiddenEmail,
        email_confirm: true,
        password: rawPassword,
        user_metadata: {
          name: rawName,
          phone: normalizedPhone,
          role: "admin"
        }
      });

      if (createAuthErr || !createdAuth.user) {
        return jsonResponse({
          success: false,
          error: createAuthErr?.message || "Failed to create administrator login credentials."
        }, 400);
      }

      const adminUserId = createdAuth.user.id;

      // Upsert profile with role = 'admin', active = true, must_change_password = true
      const { error: profileErr } = await supabaseAdmin
        .from("profiles")
        .upsert({
          id: adminUserId,
          name: rawName,
          phone: normalizedPhone,
          role: "admin",
          active: true,
          is_active: true,
          must_change_password: true
        }, { onConflict: "id" });

      if (profileErr) {
        await supabaseAdmin.auth.admin.deleteUser(adminUserId);
        return jsonResponse({
          success: false,
          error: `Failed to save administrator profile: ${profileErr.message}`
        }, 500);
      }

      // Record audit log
      await recordActivity("admin_created", `${rawName} (${normalizedPhone})`);

      return jsonResponse({
        success: true,
        message: "Administrator account created successfully.",
        admin: {
          id: adminUserId,
          name: rawName,
          phone: normalizedPhone,
          role: "admin",
          active: true,
          must_change_password: true
        }
      }, 201);
    }

    // ACTION: Toggle Admin Active Status (Disable / Enable) (Super Admin only)
    if (action === 'toggle_admin_active') {
      const targetAdminId = payload.admin_id;
      const newActive = payload.active !== undefined ? Boolean(payload.active) : false;

      if (!targetAdminId) {
        return jsonResponse({ success: false, error: "admin_id is required." }, 400);
      }

      // Super admin cannot disable their own account
      if (targetAdminId === callerUser.id) {
        return jsonResponse({
          success: false,
          error: "You cannot disable your own administrator account."
        }, 400);
      }

      // Fetch target profile
      const { data: targetProf } = await supabaseAdmin
        .from("profiles")
        .select("id, name, phone, role")
        .eq("id", targetAdminId)
        .single();

      if (!targetProf) {
        return jsonResponse({ success: false, error: "Administrator not found." }, 404);
      }

      // Prevent disabling primary super admin phone 8074257384
      if (targetProf.phone?.includes("8074257384") || targetProf.role === "super_admin") {
        return jsonResponse({
          success: false,
          error: "Primary Super Administrator accounts cannot be disabled."
        }, 400);
      }

      // Update profiles active & is_active
      const { error: upErr } = await supabaseAdmin
        .from("profiles")
        .update({
          active: newActive,
          is_active: newActive
        })
        .eq("id", targetAdminId);

      if (upErr) {
        return jsonResponse({ success: false, error: upErr.message }, 500);
      }

      // Instant lockout in Auth: ban user if deactivated, or unban if activated
      try {
        await supabaseAdmin.auth.admin.updateUserById(targetAdminId, {
          ban_duration: newActive ? "none" : "876000h"
        });
      } catch (authErr) {
        console.warn("Notice updating auth ban duration:", authErr);
      }

      // Record audit log
      await recordActivity(
        newActive ? "admin_enabled" : "admin_disabled",
        `${targetProf.name || 'Admin'} (${targetProf.phone})`
      );

      return jsonResponse({
        success: true,
        message: `Administrator ${targetProf.name || targetAdminId} has been ${newActive ? "enabled" : "disabled"} successfully.`,
        active: newActive
      }, 200);
    }

    // ACTION: Reset Admin Password (Super Admin only)
    if (action === 'reset_admin_password') {
      const targetAdminId = payload.admin_id;
      const rawPassword = (payload.password || "").trim();

      if (!targetAdminId || !rawPassword) {
        return jsonResponse({ success: false, error: "admin_id and new password are required." }, 400);
      }

      if (rawPassword.length < 8) {
        return jsonResponse({ success: false, error: "Temporary password must be at least 8 characters." }, 400);
      }

      const { data: targetProf } = await supabaseAdmin
        .from("profiles")
        .select("id, name, phone, role")
        .eq("id", targetAdminId)
        .single();

      if (!targetProf) {
        return jsonResponse({ success: false, error: "Administrator not found." }, 404);
      }

      // Update password in Auth
      const { error: authErr } = await supabaseAdmin.auth.admin.updateUserById(
        targetAdminId,
        { password: rawPassword }
      );

      if (authErr) {
        return jsonResponse({ success: false, error: authErr.message }, 400);
      }

      // Set must_change_password flag on profile
      await supabaseAdmin
        .from("profiles")
        .update({ must_change_password: true })
        .eq("id", targetAdminId);

      // Record audit log
      await recordActivity(
        "admin_password_reset",
        `${targetProf.name || 'Admin'} (${targetProf.phone})`
      );

      return jsonResponse({
        success: true,
        message: "Temporary password set successfully. Admin will be prompted to change it on their next login."
      }, 200);
    }

    // ACTION: Delete Admin (Super Admin only)
    if (action === 'delete_admin') {
      const targetAdminId = payload.admin_id;
      if (!targetAdminId) {
        return jsonResponse({ success: false, error: "admin_id is required." }, 400);
      }

      // Super admin cannot delete their own account
      if (targetAdminId === callerUser.id) {
        return jsonResponse({
          success: false,
          error: "You cannot delete your own administrator account."
        }, 400);
      }

      const { data: targetProf } = await supabaseAdmin
        .from("profiles")
        .select("id, name, phone, role")
        .eq("id", targetAdminId)
        .single();

      if (!targetProf) {
        return jsonResponse({ success: false, error: "Administrator not found." }, 404);
      }

      if (targetProf.phone?.includes("8074257384") || targetProf.role === "super_admin") {
        return jsonResponse({
          success: false,
          error: "Super Administrator accounts cannot be deleted."
        }, 400);
      }

      // Delete from profiles
      await supabaseAdmin.from("profiles").delete().eq("id", targetAdminId);

      // Delete from auth.users
      const { error: delAuthErr } = await supabaseAdmin.auth.admin.deleteUser(targetAdminId);
      if (delAuthErr) {
        console.warn("Notice deleting auth user:", delAuthErr);
      }

      // Record audit log
      await recordActivity(
        "admin_deleted",
        `${targetProf.name || 'Admin'} (${targetProf.phone})`
      );

      return jsonResponse({
        success: true,
        message: `Administrator ${targetProf.name || targetAdminId} deleted successfully.`
      }, 200);
    }

    // ACTION: Get Activity Log (Super Admin only)
    if (action === 'get_activity_log') {
      const { data: logRecords, error: logErr } = await supabaseAdmin
        .from("admin_activity")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (logErr) {
        return jsonResponse({ success: false, error: logErr.message }, 500);
      }

      return jsonResponse({
        success: true,
        logs: logRecords || []
      }, 200);
    }

    // ACTION: Log Activity (Admins & Super Admins)
    if (action === 'log_activity') {
      const actAction = payload.activity_action || 'login';
      const actTarget = payload.activity_target || null;
      await recordActivity(actAction, actTarget);
      return jsonResponse({ success: true }, 200);
    }

    // =========================================================================
    // GENERAL ADMIN ACTIONS: Customer Password Reset, Customer Deactivate, Delete Consultation, Customer Register
    // =========================================================================

    // ACTION: Customer Password Reset
    if (action === "reset_password") {
      if (!payload.customer_id || !payload.password) {
        return jsonResponse({
          success: false,
          error: "customer_id and new password are required to reset password."
        }, 400);
      }
      if (payload.password.trim().length < 8) {
        return jsonResponse({
          success: false,
          error: "Password must be at least 8 characters."
        }, 400);
      }

      const { error: resetErr } = await supabaseAdmin.auth.admin.updateUserById(
        payload.customer_id,
        { password: payload.password.trim() }
      );

      if (resetErr) {
        return jsonResponse({ success: false, error: resetErr.message }, 400);
      }

      return jsonResponse({
        success: true,
        message: "Customer password has been reset successfully."
      }, 200);
    }

    // ACTION: Customer Deactivate / Reactivate
    if (action === "deactivate") {
      if (!payload.customer_id) {
        return jsonResponse({
          success: false,
          error: "customer_id is required to update active status."
        }, 400);
      }

      const newStatus = payload.is_active !== undefined ? payload.is_active : (payload.active !== undefined ? payload.active : false);

      const { error: profErr } = await supabaseAdmin
        .from("profiles")
        .update({ 
          active: newStatus,
          is_active: newStatus 
        })
        .eq("id", payload.customer_id);

      if (profErr) {
        return jsonResponse({ success: false, error: profErr.message }, 400);
      }

      return jsonResponse({
        success: true,
        message: `Customer status updated to ${newStatus ? 'active' : 'deactivated'}.`
      }, 200);
    }

    // ACTION: Delete Consultation (Admin-only, removes consultation and child records)
    if (action === 'delete_consultation') {
      const consultId = payload.consultation_id;
      if (!consultId) {
        return jsonResponse({ success: false, error: "consultation_id is required." }, 400);
      }

      // Fetch client info for audit log
      const { data: consultData } = await supabaseAdmin
        .from('consultations')
        .select('client_name')
        .eq('id', consultId)
        .maybeSingle();

      // 1. Delete associated child data belonging only to this consultation
      await supabaseAdmin.from('journey_stage_progress').delete().eq('consultation_id', consultId);
      await supabaseAdmin.from('journey_updates').delete().eq('consultation_id', consultId);
      await supabaseAdmin.from('portal_messages').delete().eq('consultation_id', consultId);
      await supabaseAdmin.from('consultation_images').delete().eq('consultation_id', consultId);
      await supabaseAdmin.from('sheet_sync_log').delete().eq('consultation_id', consultId);

      // 2. Delete consultation row
      const { data: delData, error: delErr } = await supabaseAdmin
        .from('consultations')
        .delete()
        .eq('id', consultId)
        .select('id');

      if (delErr) {
        return jsonResponse({ success: false, error: delErr.message }, 400);
      }

      if (!delData || delData.length === 0) {
        return jsonResponse({ success: false, error: "Consultation not found or already deleted (0 rows affected)." }, 404);
      }

      // Record audit log
      await recordActivity(
        "consultation_deleted",
        coalesceClientLog(consultData?.client_name, consultId)
      );

      return jsonResponse({
        success: true,
        message: "Consultation deleted successfully.",
        deleted_id: consultId,
        count: delData.length
      }, 200);
    }

    // ACTION: Register Customer + Create Login + Create Consultation
    const rawName = (payload.name || "").trim();
    const rawPhone = (payload.phone || "").trim();
    const rawPassword = (payload.password || "").trim();
    const location = (payload.location || "").trim();
    const title = (payload.title || "Mr.").trim();
    const surname = (payload.surname || (rawName ? rawName.trim().split(/\s+/).pop() : "") || "").trim();
    const product = (payload.product || "Temple").trim();
    const projectName = payload.project_name || (surname ? `${title} ${surname}'s ${product}` : product);

    if (!rawName) {
      return jsonResponse({ success: false, error: "Customer full name is required." }, 400);
    }
    if (!rawPhone) {
      return jsonResponse({ success: false, error: "Mobile number is required." }, 400);
    }

    const cleanDigits10 = rawPhone.replace(/\D/g, "").slice(-10);
    if (cleanDigits10.length !== 10) {
      return jsonResponse({ success: false, error: "Phone number must be a valid 10-digit mobile number." }, 400);
    }
    const normalizedPhone = "+91" + cleanDigits10;
    const hiddenEmail = `${cleanDigits10}@svvayam.internal`;

    if (!rawPassword || rawPassword.length < 8) {
      return jsonResponse({ success: false, error: "Customer password must be at least 8 characters." }, 400);
    }

    // Check if customer already exists
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id, name, phone, title, surname, product, project_name, location, active, is_active")
      .or(`phone.eq.${normalizedPhone},phone.ilike.%${cleanDigits10}%`)
      .limit(1)
      .maybeSingle();

    if (existingProfile) {
      return jsonResponse({
        success: false,
        code: "CUSTOMER_EXISTS",
        error: "A customer with this mobile number already exists.",
        customer: {
          id: existingProfile.id,
          name: existingProfile.name,
          phone: existingProfile.phone || normalizedPhone,
          title: existingProfile.title || title,
          surname: existingProfile.surname || surname,
          product: existingProfile.product || product,
          project_name: existingProfile.project_name || projectName,
          location: existingProfile.location || location,
          active: existingProfile.active ?? existingProfile.is_active ?? true,
          is_active: existingProfile.is_active ?? true
        }
      }, 409);
    }

    // Also check auth.users for existing email
    const { data: { users }, error: listUsersErr } = await supabaseAdmin.auth.admin.listUsers();
    if (!listUsersErr && users) {
      const matchAuthUser = users.find(u => u.email === hiddenEmail || (u.phone && u.phone.replace(/\D/g, "").endsWith(cleanDigits10)));
      if (matchAuthUser) {
        return jsonResponse({
          success: false,
          code: "CUSTOMER_EXISTS",
          error: "A customer with this mobile number already exists.",
          customer: {
            id: matchAuthUser.id,
            name: rawName,
            phone: normalizedPhone,
            title,
            surname,
            product,
            project_name: projectName,
            location,
            active: true,
            is_active: true
          }
        }, 409);
      }
    }

    // Create customer auth user
    const { data: createdAuth, error: createAuthErr } = await supabaseAdmin.auth.admin.createUser({
      email: hiddenEmail,
      email_confirm: true,
      password: rawPassword,
      user_metadata: {
        name: rawName,
        phone: normalizedPhone,
        title,
        surname,
        product,
        project_name: projectName,
        role: "client"
      }
    });

    if (createAuthErr || !createdAuth.user) {
      if (createAuthErr?.message?.toLowerCase().includes("already") || createAuthErr?.message?.toLowerCase().includes("exists")) {
        return jsonResponse({
          success: false,
          code: "CUSTOMER_EXISTS",
          error: "A customer with this mobile number already exists."
        }, 409);
      }
      return jsonResponse({
        success: false,
        error: createAuthErr?.message || "Failed to create customer login credentials."
      }, 400);
    }

    const customerUserId = createdAuth.user.id;

    // Insert profile row with role = 'client'
    const { error: profileErr } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: customerUserId,
        name: rawName,
        phone: normalizedPhone,
        role: "client",
        title,
        surname,
        product,
        project_name: projectName,
        location,
        active: true,
        is_active: true
      }, { onConflict: "id" });

    if (profileErr) {
      await supabaseAdmin.auth.admin.deleteUser(customerUserId);
      return jsonResponse({
        success: false,
        error: `Failed to save customer profile: ${profileErr.message}`
      }, 500);
    }

    // Create Project row attached to client
    const { data: newProject, error: projectErr } = await supabaseAdmin
      .from("projects")
      .insert({
        client_id: customerUserId,
        project_name: projectName,
        product_type: product,
        location: location || "India",
        status: "draft"
      })
      .select("id")
      .single();

    if (projectErr) {
      console.warn("Project creation note:", projectErr);
    }

    const newProjectId = newProject?.id || null;

    // Create or Link Consultation record
    let linkedConsultationId = payload.consultation_id || null;

    if (payload.create_new_consultation || !linkedConsultationId) {
      const { data: newConsult, error: consultErr } = await supabaseAdmin
        .from("consultations")
        .insert({
          client_id: customerUserId,
          project_id: newProjectId,
          client_phone: normalizedPhone,
          created_by: callerUser.id,
          consultant_id: callerUser.id,
          consultant_name: callerProfile?.name || "Svvayam Admin",
          project_name: projectName,
          client_name: rawName,
          title,
          surname,
          product,
          fields: {
            client: rawName,
            title,
            surname,
            product,
            projectName,
            project_name: projectName,
            phone: normalizedPhone,
            client_phone: normalizedPhone,
            location: location,
            date: new Date().toLocaleDateString("en-CA"),
          },
          status: "draft",
          portal_visible: true,
          current_step: 1
        })
        .select("id")
        .single();

      if (consultErr) {
        await supabaseAdmin.auth.admin.deleteUser(customerUserId);
        if (newProjectId) {
          await supabaseAdmin.from("projects").delete().eq("id", newProjectId);
        }
        return jsonResponse({
          success: false,
          error: `Failed to create consultation: ${consultErr.message}`
        }, 500);
      }
      linkedConsultationId = newConsult.id;
    } else {
      const { error: linkErr } = await supabaseAdmin
        .from("consultations")
        .update({
          client_id: customerUserId,
          project_id: newProjectId,
          client_phone: normalizedPhone,
          project_name: projectName,
          client_name: rawName,
          portal_visible: true
        })
        .eq("id", linkedConsultationId);

      if (linkErr) {
        return jsonResponse({
          success: false,
          error: `Failed to link consultation: ${linkErr.message}`
        }, 500);
      }
    }

    // Record audit log for customer creation
    await recordActivity(
      "customer_created",
      `${rawName} (${normalizedPhone}) - ${projectName}`
    );

    return jsonResponse({
      success: true,
      message: "Customer login and consultation created successfully.",
      customer: {
        id: customerUserId,
        name: rawName,
        phone: normalizedPhone,
        title,
        surname,
        product,
        project_name: projectName,
        location,
        project_id: newProjectId,
        consultation_id: linkedConsultationId,
        active: true,
        is_active: true
      }
    }, 200);

  } catch (error: any) {
    return jsonResponse({
      success: false,
      error: error.message || "An unexpected error occurred during request processing."
    }, 500);
  }
});

function coalesceClientLog(clientName: string | undefined, consultId: string): string {
  if (clientName) {
    return `Consultation of ${clientName} (${consultId})`;
  }
  return `Consultation ${consultId}`;
}
