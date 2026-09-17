import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseUrl.startsWith('https://')
);

// Returns a singleton Supabase browser client
export function createClient() {
  if (!isSupabaseConfigured) {
    // Return dummy client or client with fallback if not configured yet
    return createBrowserClient(
      supabaseUrl || 'https://placeholder-project.supabase.co',
      supabaseAnonKey || 'placeholder-anon-key'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
