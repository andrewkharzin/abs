"use client";

import { createClient } from "@/utils/supabase/client";
import NoteItem from "./renders/noteItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tables } from '@/types/supabase';

interface Note {
  id: number;
  title: string;
  content: string;
  // Add other properties as needed
}

export default function RealtimeTodos() {
  const supabase = createClient();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data, error } = await supabase
          .from('todos')
          .select('*');
        if (error) {
          throw error;
        }
        if (data) {
          setNotes(data);
        }
        console.log(data)
      } catch (error) {
        console.error('Error fetching todos:', error.message);
      }
    };

    const handleRealtimeChanges = () => {
      const channel = supabase
        .channel("realtime todos")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "todos",
          },
          (payload) => {
            console.log("Realtime change received:", payload);
            fetchTodos(); // Fetch updated todos on changes
          }
        )
        .subscribe();
      console.log("Subscribed to realtime changes");
      return () => {
        supabase.removeChannel(channel);
      };
    };

    fetchTodos(); // Initial fetch
    const unsubscribe = handleRealtimeChanges();

    return () => {
      unsubscribe();
    };
  }, [supabase, router]);

  return (
    <div className="max-w-[900px] gap-2 grid lg:grid-cols-12 sm:grid-cols-3 grid-rows-2">

      {notes.slice().reverse().map(note => (
       <NoteItem key={note.id} note={note ?? []}/>
    ))}
    </div>

  );
}
