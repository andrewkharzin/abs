import { createClient } from "@/utils/supabase/client";
import RealtimeTodos from "./asyncNotes";
import TimeLineTodos from "./asyncNotesLines";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";


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

    <div className="w-full grin grin-col-2 gap-4">

      <div>

      <RealtimeTodos notes={todos ?? []} />

      </div>
      {/* <div>
      <TimeLineTodos notes={todos ?? []} />

      </div> */}


    </div>


  );
}
