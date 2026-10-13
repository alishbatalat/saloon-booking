import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY is not set.");
}

declare global {
  var __orielleSupabase: ReturnType<typeof createClient> | undefined;
}

/** Server-only client using the service_role key — bypasses RLS, never import this from a client component. */
export const supabase =
  globalThis.__orielleSupabase ??
  createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

if (process.env.NODE_ENV !== "production") globalThis.__orielleSupabase = supabase;
