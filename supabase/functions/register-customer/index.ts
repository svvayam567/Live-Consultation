// Supabase Edge Function: register-customer
// Admin-only customer registration & lifecycle management
// Creates customer auth login (phone converted to hidden email + password) via Service Role Key
// Upserts profile with role 'client' and links consultations.client_id

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
  action?: 'register' | 'deactivate' | 'reset_password' | 'register_admin';
  role?: 'client' | 'admin';
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
  is_active?: boolean;
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

    // 1. Verify caller authorization (must be logged-in admin)
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

    // Check if caller is admin
    const { data: callerProfile } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", callerUser.id)
      .single();

    if (callerProfile?.role !== "admin") {
      return jsonResponse({
        success: false,
        error: "Forbidden. Admin access required."
      }, 403);
    }

    const payload: RegisterRequest = await req.json();

    // ACTION: Reset Password
    if (payload.action === "reset_password") {
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

    // ACTION: Deactivate / Reactivate
    if (payload.action === "deactivate") {
      if (!payload.customer_id) {
        return jsonResponse({
          success: false,
          error: "customer_id is required to update active status."
        }, 400);
      }

      const newStatus = payload.is_active !== undefined ? payload.is_active : false;

      // Update profile
      const { error: profErr } = await supabaseAdmin
        .from("profiles")
        .update({ is_active: newStatus })
        .eq("id", payload.customer_id);

      if (profErr) {
        return jsonResponse({ success: false, error: profErr.message }, 400);
      }

      return jsonResponse({
        success: true,
        message: `Customer status updated to ${newStatus ? 'active' : 'deactivated'}.`
      }, 200);
    }

    // ACTION: Register Administrator
    if (payload.action === 'register_admin' || payload.role === 'admin') {
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
        return jsonResponse({ success: false, error: "Admin password must be at least 8 characters." }, 400);
      }

      // Check if user already exists
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

      // Upsert profile with role = 'admin'
      const { error: profileErr } = await supabaseAdmin
        .from("profiles")
        .upsert({
          id: adminUserId,
          name: rawName,
          phone: normalizedPhone,
          role: "admin",
          is_active: true
        }, { onConflict: "id" });

      if (profileErr) {
        await supabaseAdmin.auth.admin.deleteUser(adminUserId);
        return jsonResponse({
          success: false,
          error: `Failed to save administrator profile: ${profileErr.message}`
        }, 500);
      }

      return jsonResponse({
        success: true,
        message: "Administrator account created successfully.",
        admin: {
          id: adminUserId,
          name: rawName,
          phone: normalizedPhone,
          role: "admin"
        }
      }, 201);
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

    // 2. Check if customer already exists (Prevent Duplicates)
    // First check profiles table
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id, name, phone, title, surname, product, project_name, location, is_active")
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
            is_active: true
          }
        }, 409);
      }
    }

    // 3. Create customer auth user (Phone converted to hidden email + password)
    // Atomic: If this step fails, no profile, project, or consultation is created
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

    // 4. Insert profile row with role = 'client'
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
        is_active: true
      }, { onConflict: "id" });

    if (profileErr) {
      // Rollback auth user creation if profile insertion fails
      await supabaseAdmin.auth.admin.deleteUser(customerUserId);
      return jsonResponse({
        success: false,
        error: `Failed to save customer profile: ${profileErr.message}`
      }, 500);
    }

    // 5. Create Project row attached to client
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

    // 6. Create Consultation record linked to client_id
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
        // Rollback
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
      // Link existing consultation
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

    // Plain-text password is NEVER returned or stored in database
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
        is_active: true
      }
    }, 200);
  } catch (error: any) {
    return jsonResponse({
      success: false,
      error: error.message || "An unexpected error occurred during customer registration."
    }, 500);
  }
});
