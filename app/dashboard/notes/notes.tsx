import { createClient } from "@/utils/supabase/client";
import RealtimeTodos from "./asyncNotes";

export default function Home() {

  const fetchTodos = async () => {
    try {
      const supabase = createClient();
      const { data: todos, error } = await supabase.from("todos").select();
      if (error) {
        throw error;
      }
      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error.message);
      return null; // Handle error appropriately
    }
  };

  const todos = fetchTodos();

  return (
    <div className="w-full flex flex-col gap-4">

      <RealtimeTodos notes={todos ?? []} />
    </div>
  );
}
