"use client";

import { createClient } from "@/utils/supabase/client";
import NoteItem from "./renders/noteItem";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


interface Todo {
  id: number;
  content: string;
  inserted_at: string;
  category: string;
}

export default function RealtimeTodos({ todos }: { todos: Todo[] }) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime todos")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <>
      {todos?.map((todo: Todo) => (
        <div key={todo.id}>
          <NoteItem note={todo} />
        </div>
      ))}
    </>
  );
}