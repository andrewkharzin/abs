import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Divider,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  CardBody,
  Spacer,
} from "@nextui-org/react";

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  user_id: string;
  // Add other properties as needed
}

interface SharedNoteItemProps {
  note: Note;
  // Add other props as needed
}

// Ваш компонент SharedNoteItem
const SharedNoteItem: React.FC<SharedNoteItemProps> = ({ note }) => {
  console.log("Note data:", note); // Log the note object
  return (
    <div>
      <Card key={note.id} isFooterBlurred className="max-w-full" shadow="sm">
        <CardHeader className="flex justify-between ">
          <div className="flex-none w-14">
            <h3>{note.category}</h3>
          </div>

          <div className="order-last mr-2"></div>
        </CardHeader>
        <CardBody>
          <p className="font-light text-base font-roboto text-md">
            {note.content}
          </p>
        </CardBody>
        <Spacer y={10} />
        <CardFooter className="justify-between">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 items-start justify-center">
              <Chip
                variant="dot"
                className="uppercase font-roboto text-xs text-default-400"
                size="sm"
                radius="sm"
                color={
                  note.category === "URGENT"
                    ? "danger"
                    : note.category === "SHIFT"
                    ? "warning"
                    : "success"
                }
              >
                {note.category}
              </Chip>

              <Spacer y={2} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4"></div>
        </CardFooter>
      </Card>
    </div>
  );
};
const ShareToMe: React.FC = () => {
  const supabase = createClient();
  const router = useRouter();
  const [sharedNotes, setSharedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const supabase = createClient();
      const userId = supabase.auth.getUser();

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.from("todos").select(`
            id,
            title,
            content,
            category,
            user_id,
            todo_shares (
              todo_id,
              shared_by,
              shared_to
            )
            `);
        // .eq('user_id', "todo_shares:shared_to")
        // .or(`todo_shares.shared_to.eq.${userId}`);

        console.log("Todos data:", data);
        if (error) {
          throw error;
        }

        if (data) {
          setSharedNotes(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching todos:", error.message);
        setLoading(false);
      }
    };
    const handleRealtimeChanges = () => {
      const channel = supabase
        .channel("realtime todo_shared")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "todo_shared" },
          (payload) => {
            console.log("Изменения в реальном времени:", payload);
            fetchTodos();
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
    };

    const unsubscribe = handleRealtimeChanges();

    return () => {
      fetchTodos();
      unsubscribe();
    };
  }, [supabase, router]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Отображение разделенных заметок */}
          {sharedNotes && sharedNotes.length > 0 ? (
            sharedNotes.map((note) => (
              <div key={note.id} className="p-4">
                <SharedNoteItem key={note.id} note={note} />
                <Divider />
              </div>
            ))
          ) : (
            <p>Нет разделенных заметок.</p>
          )}
        </div>
      )}
    </>
  );
};

export default ShareToMe;
