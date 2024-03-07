import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Note } from "@/types/note";
import SharedNoteItem from "./SharedNoteItem";
import { Divider } from "@nextui-org/react";

interface MySharesProps {
  // Add any props that you need
}

const MyShares: React.FC<MySharesProps> = () => {
  const supabase = createClient();
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
        let { data: todoShared, error } = await supabase
          .from('todo_shares')
          .select()
          // .eq('shared_by', userId)
          .order('todo_id', { ascending: true });
        console.log("Todos shared", todoShared);
        if (error) {
          console.error("Error fetching shared todos:", error);
          throw error;
        }

        if (todoShared) {
          const sharedNotes = todoShared.map((note) => ({
            // id: note.todos.id,
            // creatorId: note.todos.user_id,
            // title: note.todos.title,
            content: note.todos.content,
            category: note.todos.category,
            sharedBy: note.users.email,
            sharedTo: note.shared_to

          }));

          console.log('Shared notes:', sharedNotes);
          setSharedNotes(sharedNotes);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching todos:', error.message);
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {sharedNotes.length > 0 ? (
            sharedNotes.map((note) => (
              <div key={note.id} className="p-4">
                <SharedNoteItem key={note.id} note={note} />
                <Divider />
              </div>
            ))
          ) : (
            <p>You haven't shared any notes yet.</p>
          )}
        </div>
      )}
    </>
  );
};

export default MyShares;
