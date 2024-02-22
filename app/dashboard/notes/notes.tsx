"use client"
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from 'react'
import RealtimeTodos from "./asyncNotes";
import { Database } from '@/types/supabase'
import AddNoteModal from './noteModal';


import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Home({ user }: { user: User | null }) {
  const supabase = createClientComponentClient<Database>()
  const [isModalOpen, setIsModalOpen] = useState(false);


  //   // Fetch users from database
  //   const fetchUsers = async () => {
  //     try {
  //       const { data, error } = await supabase.from('users').select('id, username');
  //       if (error) {
  //         throw error;
  //       }
  //       if (data) {
  //         const users = data.map((user: any) => ({
  //           value: user.id,
  //           label: user.username
  //         }));
  //         setUsers(users);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching users:', error.message);
  //     }
  //   };

  //   fetchCategories();
  //   fetchUsers();
  // }, []); // Fetch data only once when component mounts



  const fetchTodos = async () => {
    try {
      const supabase = createClient();
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
      <AddNoteModal isOpen={isModalOpen} onClose={toggleModal} />
      <div>

      <RealtimeTodos notes={todos ?? []} />

      </div>
      <div>
      {/* <TimeLineTodos notes={todos ?? []} /> */}

      </div>


    </div>


  );
}
