import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Tables } from '@/types/supabase';
import { Chrono } from "react-chrono";


interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  user_id: string;
  inserted_at: string

  // Add other properties as needed
}

interface Profile {
  // Define profile properties
  avatar_url: string;
  username: string;
}

export default function RealtimeTodos() {
  const supabase = createClient();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodosAndProfiles = async () => {
      try {
        // Fetch todos
        const { data: todosData, error: todosError } = await supabase
          .from('todos')
          .select('*')
          .order('id', { ascending: true })
        if (todosError) {
          throw todosError;
        }
        if (todosData) {
          setNotes(todosData);
        }

        // Fetch profiles
        const userIds = todosData.map(todo => todo.user_id);
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', userIds) // Assuming user_id is the primary key in the profiles table
        if (profilesError) {
          throw profilesError;
        }
        if (profilesData) {
          setProfiles(profilesData);
          setAvatarUrl(avatar_url)
          console.log("Profiles dtat", profilesData)
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
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
            fetchTodosAndProfiles(); // Fetch updated todos on changes
          }
        )
        .subscribe();
      console.log("Subscribed to realtime changes");
      return () => {
        supabase.removeChannel(channel);
      };
    };

    fetchTodosAndProfiles(); // Initial fetch
    const unsubscribe = handleRealtimeChanges();

    return () => {
      unsubscribe();
    };

  }, [supabase, router]);

  const timelineItems = notes.map((note, index) => ({
    title: note.title, // Main title
    cardTitle: note.category, // Category can be used as card title
    cardSubtitle: note.content, // Content can be used as card subtitle
    date: note.inserted_at, // Description can be used as detailed text
  }));
  console.log("Caheck", timelineItems)

  return (
      <div style={{ width: "100%", height: "400px" }}>
      <Chrono items={timelineItems} mode="VERTICAL" />
    </div>
  );
}