import { createClient, SupabaseClient } from '@supabase/supabase-js';

const metaEnv = typeof import.meta !== 'undefined' ? (import.meta as any).env : undefined;
const supabaseUrl = (metaEnv?.VITE_SUPABASE_URL as string) || '';
const supabasePublishableKey = (metaEnv?.VITE_SUPABASE_PUBLISHABLE_KEY as string) || '';

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
