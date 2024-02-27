import { TypedSupabaseClient } from "../../utils/supabase";

export function getNoteById(client: TypedSupabaseClient, noteId: number) {

  return client.from("notes").select("*").eq("id", noteId).throwOnError().single();
}