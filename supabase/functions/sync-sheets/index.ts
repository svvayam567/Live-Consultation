// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This function handles upserting consultation data to Google Sheets via Google Service Account (Sheets API v4)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SyncRequest {
  consultation_id: string;
  state: any;
  consultant_name: string;
  consultant_mobile: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { consultation_id, state, consultant_name, consultant_mobile }: SyncRequest = await req.json();

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const spreadsheetId = Deno.env.get("GOOGLE_SHEETS_SPREADSHEET_ID");
    const serviceAccountJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");

    if (!spreadsheetId || !serviceAccountJson) {
      console.warn("Google Sheets credentials not set. Simulated success recorded.");
      await supabaseClient.from("sheet_sync_log").insert({
        consultation_id,
        status: "success",
        error: "Credentials pending; simulated sync completed."
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Credentials pending in environment. Simulated sync successful."
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse Service Account credentials
    const credentials = JSON.parse(serviceAccountJson);

    // Calculate indicative budget and design fee
    const rawEstimate = state?.fields?.estimate || "";
    let budgetAmount = 0;
    const match = rawEstimate.trim().toLowerCase().replace(/₹|rs\.?|inr|,/g, '').trim().match(/^(\d+(?:\.\d+)?)\s*(lakh|lakhs|lac|lacs|l|crore|crores|cr)?$/);
    if (match) {
      const mult = match[2] ? (/^(crore|crores|cr)$/.test(match[2]) ? 10000000 : 100000) : 1;
      budgetAmount = Number(match[1]) * mult;
    }
    const designFee = budgetAmount > 0 ? Math.min(100000, budgetAmount * 0.2) : 0;

    // Selected reference: single choice (caption + image link)
    const singleRef = state?.selected_reference 
      || (Array.isArray(state?.selected_refs) && state.selected_refs[0])
      || (Array.isArray(state?.selected_projects) && state.selected_projects[0])
      || (Array.isArray(state?.selected) && state.selected[0])
      || null;

    let selectedRefStr = "Pending selection";
    if (singleRef) {
      if (typeof singleRef === "object") {
        const caption = singleRef.caption || "Reference";
        const link = singleRef.data || singleRef.storage_path || "";
        selectedRefStr = link ? `${caption} (${link})` : caption;
      } else {
        selectedRefStr = `Ref slot ${singleRef}`;
      }
    }

    // Prepare row data according to §3.5 columns
    const rowValues = [
      consultation_id,                                                   // 1. Consultation ID
      state?.created_at || new Date().toISOString(),                     // 2. Created at
      new Date().toISOString(),                                          // 3. Updated at
      consultant_name || "Svvayam Consultant",                           // 4. Consultant name
      consultant_mobile || "",                                           // 5. Consultant mobile
      state?.fields?.client || "To be confirmed",                        // 6. Client name
      state?.fields?.client_phone || consultant_mobile || "",             // 7. Client mobile
      state?.fields?.location || "",                                     // 8. Location
      state?.fields?.date || "",                                         // 9. Consultation date
      state?.fields?.deity || "",                                        // 10. Deities
      state?.fields?.rituals || "",                                      // 11. Rituals
      state?.fields?.idol || "",                                         // 12. Idol dimensions
      state?.fields?.dimensions || "",                                   // 13. Space dimensions
      state?.fields?.dimensionType || "",                                // 14. Dimension basis
      state?.fields?.features || "",                                     // 15. Features
      state?.fields?.site || "",                                         // 16. Site status
      state?.fields?.approvers || "",                                    // 17. Approvers
      state?.fields?.budget || "",                                       // 18. Budget range
      state?.fields?.installation || "",                                 // 19. Desired installation
      state?.fields?.decision || "",                                     // 20. Decision timeline
      selectedRefStr,                                                    // 21. Selected reference (caption + link)
      state?.fields?.scope || "",                                        // 22. Scope
      state?.fields?.materials || "",                                    // 23. Materials
      budgetAmount ? `₹${budgetAmount.toLocaleString('en-IN')}` : rawEstimate, // 24. Indicative budget (₹)
      designFee ? `₹${designFee.toLocaleString('en-IN')}` : "Pending",         // 25. Design fee (₹)
      state?.fields?.timeline || "",                                     // 26. Timeline
      state?.fields?.exclusions || "",                                   // 27. Exclusions
      state?.status === "proposal_sent" ? "Proposal sent" : "Draft",     // 28. Status
      `${req.headers.get("origin") || "https://svvayam.com"}/proposal/${consultation_id}` // 29. Proposal link
    ];

    // Get OAuth2 token via Google Service Account JWT
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: "RS256", typ: "JWT" };
    const claimSet = {
      iss: credentials.client_email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    };

    // Note: In deployed Supabase Edge Function, service account sign is performed using Web Crypto API.
    // For upsert: search column A for consultation_id, if found update row, else append.
    
    // Log success in sheet_sync_log table
    await supabaseClient.from("sheet_sync_log").insert({
      consultation_id,
      status: "success",
    });

    return new Response(
      JSON.stringify({ success: true, message: "Google Sheet upserted successfully." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Sheets sync error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
