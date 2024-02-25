"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from 'react';
import RealtimeTodos from "./asyncNotes";
import RealtimeNoteUsers from "./asyncNotesUsers";
import AddNoteModal from './noteModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <AddNoteModal isOpen={isModalOpen} onClose={toggleModal} />
    <div className="container grid grid-cols-2 grid-rows-2 gap-4">
      <div>
        <h3>My notes</h3>
        {/* For current user */}
        <RealtimeTodos />

      </div>
        <div>
          <h3>Users flow</h3>
          {/* For another users */}
        <RealtimeNoteUsers />
        </div>
    </div>
    </>
  );
}
