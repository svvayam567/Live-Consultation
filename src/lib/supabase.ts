import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabasePublishableKey && 
  !supabaseUrl.includes('your-supabase') &&
  !supabaseUrl.includes('placeholder')
);

// Create real Supabase client or null if not configured
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null;

// Initial admin phones list from env (comma-separated, e.g. "+919182424228")
export const INITIAL_ADMIN_PHONES = (import.meta.env.VITE_INITIAL_ADMIN_PHONES || '+919182424228')
  .split(',')
  .map((p: string) => p.replace(/\s+/g, ''));
