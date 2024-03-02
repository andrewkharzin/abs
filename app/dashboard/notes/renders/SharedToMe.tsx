import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/react";

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
      TEst
      {/* Отображение данных разделенной заметки */}
      <h3>{note.category}</h3>
      <p>{note.content}</p>
      {/* Другие данные */}
    </div>
  );
};
const ShareToMe: React.FC = () => {
  const supabase = createClient();
  const router = useRouter();
  const [sharedNotes, setSharedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSharedNotes = async () => {
      try {
        const { data: sharedNotesData, error: sharedNotesError } = await supabase
          .from('todos_shared')
          .select('*')
          .order('id', { ascending: true });

        if (sharedNotesError) {
          throw sharedNotesError;
        }

        if (sharedNotesData) {
          const todoIds = sharedNotesData.map(note => note.todo_id);
          const { data: todosData, error: todosError } = await supabase
            .from('todos')
            .select('*')
            .in('id', todoIds)
            .order('id', { ascending: true });

          if (todosError) {
            throw todosError;
          }

          if (todosData) {
            setSharedNotes(todosData);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
        setLoading(false);
      }
    };

    const handleRealtimeChanges = () => {
      const channel = supabase
        .channel("realtime todos_shared")
        .on("postgres_changes", { event: "*", schema: "public", table: "todos_shared" }, (payload) => {
          console.log("Изменения в реальном времени:", payload);
          fetchSharedNotes();
        })
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
    };

    fetchSharedNotes();
    const unsubscribe = handleRealtimeChanges();

    return () => {
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
          sharedNotes.map(note => (
            <div key={note.id} className="p-4">
              <SharedNoteItem
                key={note.id}
                note={note}
              />
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