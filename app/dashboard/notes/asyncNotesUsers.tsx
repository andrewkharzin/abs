import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import NoteItem from "./renders/noteItem";
import { useRouter } from "next/navigation";
import { Tables } from '@/types/supabase';

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

export default function RealtimeNoteUsers() {
  const supabase = createClient();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodosAndProfiles = async () => {
      try {
        // Fetch todos
        const { data: todosData, error: todosError } = await supabase
          .from('todos')
          .select('*');
        if (todosError) {
          throw todosError;
        }
        if (todosData) {
          // Filter out notes of the current user
          const currentUserId = supabase.auth.user?.id;
          const filteredTodos = todosData.filter(todo => todo.user_id !== currentUserId);
          setNotes(filteredTodos);
        }

        // Fetch profiles for all users except the current user
        const currentUserId = supabase.auth.user?.id;
        const userIds = filteredTodos.map(todo => todo.user_id); // Use filteredTodos instead of todosData
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', userIds);
        if (profilesError) {
          throw profilesError;
        }
        if (profilesData) {
          setProfiles(profilesData);
          console.log("Profiles data", profilesData);
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
    <div className="max-w-[400px]">
      {notes && notes.length > 0 && notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          profile={profiles.find(profile => profile.id === note.user_id)}
        />
      ))}
    </div>
  );
}
