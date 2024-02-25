// signOut.ts
import { createClient } from "@/utils/supabase/client"; // Import the client-side createClient function
import { useRouter } from "next/router";

export default async function signOut() {
  const supabase = createClient(); // Use the client-side createClient function
  await supabase.auth.signOut();
}