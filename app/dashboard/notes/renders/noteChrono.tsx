import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Chrono } from "react-chrono";
import { Database, Tables } from '@/types/supabase'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  user_id: string;
  inserted_at: string;
}



interface NoteItemProps {
  // note: Tables<'todos'>;
  profile: Tables<'profiles'>;
  avatar_url: string;
}

interface Profile {
  // Define profile properties
  avatar_url: string;
  username: string;
}



export default function RealtimeTodos({ profile }: {profile: NoteItemProps}) {
  const supabase = createClient();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]); // Modify as needed
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodosAndProfiles = async () => {
      try {
        const { data: todosData, error: todosError } = await supabase
          .from('todos')
          .select('*')
          .order('id', { ascending: true });
        if (todosError) {
          throw todosError;
        }
        if (todosData) {
          setNotes(todosData);

          // Fetch profiles
          const userIds = todosData.map(todo => todo.user_id);
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .in('id', userIds);
          if (profilesError) {
            throw profilesError;
          }
          if (profilesData) {
          setProfiles(profilesData);
          setAvatarUrl(avatar_url)
          console.log("Profiles dtat", profilesData)
        }
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

  const avatarUrl = profile ? `https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}` : '';

  const timelineItems = notes.map((note, index) => ({
    title: note.title,
    cardTitle: note.title,
    cardDetailedText: note.content,
    date: note.inserted_at,
    // media: {
    //   type: "IMAGE",
    //   source: {
    //     url: {avatarUrl}
    //   }
    // }
  }));
  console.log("Check", timelineItems);

  return (
    <div style={{ width: "800px", height: "400px" }}>
      {notes && notes.length > 0 && notes.slice().reverse().map(note => (
       <Chrono
         key={note.id}
         items={timelineItems}
         mode="VERTICAL_ALTERNATING"
         titleDateFormat='MMM DD, YYYY'
         hideControls="true"
         enableOutline="false"
         enableDarkToggle="true"
         classNames="dark:text-base text-base text-sm font-roboto"

         profile={profiles.find(profile => profile.id === note.user_id)} />
      ))}
    </div>

  );
}
