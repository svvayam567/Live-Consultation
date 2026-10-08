// Supabase Edge Function: register-customer
// Admin-only customer registration & lifecycle management
// Creates confirmed phone auth user via Service Role Key (secret)
// Upserts profile with role 'customer' and links consultations.client_id

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegisterRequest {
  action?: 'register' | 'deactivate';
  name?: string;
  phone?: string;
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

    // ACTION: Register Customer
    const rawName = (payload.name || "").trim();
    let rawPhone = (payload.phone || "").trim();
    const location = (payload.location || "").trim();

    if (!rawName || !rawPhone) {
      throw new Error("Customer name and phone number are required.");
    }

    // Format phone with +91 default
    if (!rawPhone.startsWith("+")) {
      rawPhone = "+91" + rawPhone.replace(/^0+/, "");
    }

    // 2. Check if auth user already exists or create new confirmed user
    let customerUserId: string;

    // Search existing users
    const { data: { users }, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
    if (listErr) throw listErr;

    const existingUser = users.find((u) => u.phone === rawPhone);

    if (existingUser) {
      customerUserId = existingUser.id;
    } else {
      // Create confirmed phone auth user
      const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
        phone: rawPhone,
        phone_confirm: true,
        user_metadata: { name: rawName }
      });

      if (createErr || !created.user) {
        throw createErr || new Error("Failed to create customer auth user.");
      }
      customerUserId = created.user.id;
    }

    // 3. Upsert into public.profiles with role 'customer'
    const { error: profileErr } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: customerUserId,
        name: rawName,
        phone: rawPhone,
        role: "customer",
        is_active: true
      }, { onConflict: "id" });

    if (profileErr) throw profileErr;

    // 4. Link or Create Consultation
    let linkedConsultationId = payload.consultation_id || null;

    if (payload.create_new_consultation || !linkedConsultationId) {
      // Create new draft consultation linked to client_id
      const { data: newConsult, error: consultErr } = await supabaseAdmin
        .from("consultations")
        .insert({
          client_id: customerUserId,
          client_phone: rawPhone,
          created_by: callerUser.id,
          fields: {
            client: rawName,
            location: location,
            date: new Date().toLocaleDateString("en-CA"),
          },
          status: "draft",
          portal_visible: false,
          current_step: 0
        })
        .select("id")
        .single();

      if (consultErr) throw consultErr;
      linkedConsultationId = newConsult.id;
    } else {
      // Link existing consultation
      const { error: linkErr } = await supabaseAdmin
        .from("consultations")
        .update({
          client_id: customerUserId,
          client_phone: rawPhone
        })
        .eq("id", linkedConsultationId);

      if (linkErr) throw linkErr;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Customer successfully registered and linked.",
        customer: {
          id: customerUserId,
          name: rawName,
          phone: rawPhone,
          location,
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
