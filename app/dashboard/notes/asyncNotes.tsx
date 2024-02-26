import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import NoteItem from "./renders/noteItem";
import { useRouter } from "next/navigation";
import { Tables } from '@/types/supabase';
import TodoTimeline from './renders/noteChrono'
interface Note {
  id: number;
  title: string;
  content: string;
  user_id: string;
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

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {notes && notes.length > 0 && notes.slice().reverse().map(note => (
        <div key={note.id} className="p-4">

          <NoteItem
            key={note.id}
            note={note}
            profile={profiles.find(profile => profile.id === note.user_id)}
          />
        </div>
      ))}

    </div>
  );
}