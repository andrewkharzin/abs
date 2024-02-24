"use client"
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from 'react'
import RealtimeTodos from "./asyncNotes";
import { Database } from '@/types/supabase'
import AddNoteModal from './noteModal';


export default function Home() {
  const supabase = createClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTodos = async () => {
    try {
      const { data: todos, error } = await supabase.from("todos").select();
      if (error) {
        throw error;
      }
      console.log(todos)
      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error.message);
      return null; // Handle error appropriately
    }
  };




  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const todos = fetchTodos();

  return (

    <div className="w-full grin grin-col-2 gap-4">
      {/* <AddNoteModal isOpen={isModalOpen} onClose={toggleModal} /> */}
      <div>

         <RealtimeTodos notes={todos ?? []} />

      </div>
    </div>


  );
}
