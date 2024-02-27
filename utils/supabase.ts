import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";


export type TypedSupabaseClient = SupabaseClient<Database>;
let client: TypedSupabaseClient | undefined;

export function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  return client;
}
