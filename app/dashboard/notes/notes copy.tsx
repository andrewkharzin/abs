"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from 'react';
import RealtimeTodos from "./asyncNotes";
import RealtimeNoteUsers from "./asyncNotesUsers";
import RealtimeTodosChrono from "./renders/noteChrono";
import AddNoteModal from './noteModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      <AddNoteModal isOpen={isModalOpen} onClose={toggleModal} />
    <div className="container grid grid-cols-2 gap-4">
      <div className="mt-5">
        <h3>My notes</h3>
        {/* For current user */}
        <RealtimeTodos />

      </div>
        <div>
          <h3>Users flow</h3>
          <RealtimeTodosChrono />
        </div>
    </div>
    </>
  );
}
