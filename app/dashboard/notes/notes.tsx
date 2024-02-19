import { createClient } from "@/utils/supabase/client"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RealtimeTodos from "./asyncNotes";
import { Tables } from '@/types/supabase';

interface NoteItemProps {
  todos: Tables<'todos'>; // Use the imported type for the note prop
}

export default async function Home({ todos }: { note: NoteItemProps}) {
  // const supabase = createClient();
  // const { data: todos } = await supabase
  //   .from("todos")
  //   .select()
  //   console.log(todos)
  return (

      <RealtimeTodos todos={todos ?? []} />

  );
}