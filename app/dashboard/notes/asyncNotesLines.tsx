"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
import { createClient } from "@/utils/supabase/client";
import NoteItem from "./renders/noteItem";
import { Tables } from '@/types/supabase';

interface Note {
  id: number;
  title: string;
  content: string;
  inserted_at: string; // Assuming inserted_at is a string timestamp
  // Add other properties as needed
}

export default function TimeLineTodos() {
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
    <div className="max-w-[900px] gap-2 grid lg:grid-cols-12 sm:grid-cols-2 grid-rows-2 px-8">

        {notes.slice().reverse().map(note => (
           <div key={note.id}>
            <ol className="border-l border-neutral-300 dark:border-neutral-500">
            {/* <!--First item--> */}
            <li>
              <div className="flex-start flex items-center pt-3">
                <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
                <p className="text-sm text-neutral-500 dark:text-neutral-300">
                  {note.inserted_at}
                </p>
              </div>
              <div className="mb-6 ml-4 mt-2">
                <h4 className="mb-1.5 text-xl font-semibold">
                  {note.title}
                </h4>
                
              </div>
            </li>
              </ol>
            </div>
        ))}
    </div>
  );
}
