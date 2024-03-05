import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import NoteItem from "./renders/noteItem";
import { useRouter } from "next/navigation";
import { Tables } from "@/types/supabase";
import TodoTimeline from "./renders/noteChrono";
import { Button, Divider, Spacer } from "@nextui-org/react";
import NoteSkeleton from "./loading/note_skeleton";
interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
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
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodosAndProfiles = async () => {
      try {
        // Fetch todos
        const { data: todosData, error: todosError } = await supabase
          .from("todos")
          .select("*")
          .order("id", { ascending: true });
        if (todosError) {
          throw todosError;
        }
        if (todosData) {
          console.log("todos Data", todosData)
          setNotes(todosData);
        }

        // Fetch profiles
        const userIds = todosData.map((todo) => todo.user_id);
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("*")
          .in("id", userIds); // Assuming user_id is the primary key in the profiles table
        if (profilesError) {
          throw profilesError;
        }
        if (profilesData) {
          setProfiles(profilesData);
          setAvatarUrl(avatar_url);
          console.log("Profiles dtat", profilesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
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

  // Определите функцию onShare в родительском компоненте
  const handleShareNote = async (noteId: number, userId: string) => {
    try {
      let { data, error } = await supabase.rpc("share_todo", {
        todo_id: noteId,
        shared_to: userId,
      });

      console.log("Share to do item", data);
      if (error) {
        throw error;
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Filter notes based on the selected filter
  const filteredNotes =
    selectedFilter === "all"
      ? notes
      : notes.filter((note) => note.category === selectedFilter);

  // Handler for selecting a filter
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      <Spacer y={2} />
      <div className="flex space-x-2 mb-4 ml-2">
        <Button
          size="sm"
          variant="ghost"
          radius="sm"
          onClick={() => handleFilterSelect("all")}
        >
          All
        </Button>
        <Button
          size="sm"
          variant="solid"
          color="danger"
          radius="sm"
          onClick={() => handleFilterSelect("URGENT")}
        >
          URGENT
        </Button>
        <Button
          size="sm"
          variant="ghost"
          radius="sm"
          onClick={() => handleFilterSelect("COMMON")}
        >
          COMMON
        </Button>
        <Button
          size="sm"
          variant="ghost"
          radius="sm"
          onClick={() => handleFilterSelect("SHIFT")}
        >
          SHIFT
        </Button>
        {/* Add more buttons for other categories */}
      </div>
      <Divider />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredNotes &&
          filteredNotes.length > 0 &&
          filteredNotes
            .slice()
            .reverse()
            .map((note) => (
              <div key={note.id} className="p-4">
                <NoteItem
                  key={note.id}
                  note={note}
                  profile={profiles.find(
                    (profile) => profile.id === note.user_id
                  )}
                  onShare={handleShareNote} // Добавьте этот пропс
                />
              </div>
            ))}
      </div>
    </>
  );
}
