// Supabase Edge Function: register-customer
// Admin-only customer registration & lifecycle management
// Creates customer auth login (phone converted to hidden email + password) via Service Role Key
// Upserts profile with role 'client' and links consultations.client_id

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegisterRequest {
  action?: 'register' | 'deactivate' | 'reset_password';
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
      throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment configuration.");
    }

    // Initialize admin client with service role key (functions secret)
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // 1. Verify caller authorization (must be logged-in admin)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing authorization header." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user: callerUser }, error: callerError } = await supabaseAdmin.auth.getUser(token);

    if (callerError || !callerUser) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized access token." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if caller is admin
    const { data: callerProfile } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", callerUser.id)
      .single();

    if (callerProfile?.role !== "admin") {
      return new Response(
        JSON.stringify({ success: false, error: "Forbidden. Admin access required." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload: RegisterRequest = await req.json();

    // ACTION: Reset Password
    if (payload.action === "reset_password") {
      if (!payload.customer_id || !payload.password) {
        throw new Error("customer_id and new password are required to reset password.");
      }
      if (payload.password.trim().length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      const { error: resetErr } = await supabaseAdmin.auth.admin.updateUserById(
        payload.customer_id,
        { password: payload.password.trim() }
      );

      if (resetErr) throw resetErr;

      return new Response(
        JSON.stringify({
          success: true,
          message: "Customer password has been reset successfully."
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ACTION: Deactivate / Reactivate
    if (payload.action === "deactivate") {
      if (!payload.customer_id) {
        throw new Error("customer_id is required to update active status.");
      }

      const newStatus = payload.is_active !== undefined ? payload.is_active : false;

      // Update profile
      const { error: profErr } = await supabaseAdmin
        .from("profiles")
        .update({ is_active: newStatus })
        .eq("id", payload.customer_id);

      if (profErr) throw profErr;

      return new Response(
        JSON.stringify({ success: true, message: `Customer status updated to ${newStatus ? 'active' : 'deactivated'}.` }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
      throw new Error("Customer name is required.");
    }
    if (!rawPhone) {
      throw new Error("Phone number is required.");
    }

    const cleanDigits10 = rawPhone.replace(/\D/g, "").slice(-10);
    if (cleanDigits10.length !== 10) {
      throw new Error("Phone number must be a valid 10-digit mobile number.");
    }
    const normalizedPhone = "+91" + cleanDigits10;
    const hiddenEmail = `${cleanDigits10}@svvayam.internal`;

    if (!rawPassword || rawPassword.length < 6) {
      throw new Error("Customer password is required and must be at least 6 characters.");
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
      return new Response(
        JSON.stringify({
          success: false,
          code: "CUSTOMER_EXISTS",
          error: "Customer already exists with this mobile number.",
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
        }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Also check auth.users for existing email
    const { data: { users }, error: listUsersErr } = await supabaseAdmin.auth.admin.listUsers();
    if (!listUsersErr && users) {
      const matchAuthUser = users.find(u => u.email === hiddenEmail || (u.phone && u.phone.replace(/\D/g, "").endsWith(cleanDigits10)));
      if (matchAuthUser) {
        return new Response(
          JSON.stringify({
            success: false,
            code: "CUSTOMER_EXISTS",
            error: "Customer already exists with this mobile number.",
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
          }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
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
      throw new Error(createAuthErr?.message || "Failed to create customer auth user.");
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
      throw new Error(`Failed to save customer profile: ${profileErr.message}`);
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
        throw new Error(`Failed to create consultation: ${consultErr.message}`);
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
        throw new Error(`Failed to link consultation: ${linkErr.message}`);
      }
    }

    // Plain-text password is NEVER returned or stored in database
    return new Response(
      JSON.stringify({
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
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An unexpected error occurred during customer registration."
      }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
