"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from 'react';
import RealtimeTodos from "./asyncNotes";
import RealtimeNoteUsers from "./asyncNotesUsers";
import RealtimeTodosChrono from "./renders/noteChrono";
import AddNoteModal from './noteModal';
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";

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
    <div className="flex w-full flex-col">
    <Tabs disabledKeys={["timeline"]} aria-label="Disabled Options">
      <Tab key="notes" title="My notes">
          <RealtimeTodos />
      </Tab>
      <Tab key="timeline" title="Timeline" className="py-2">


            <RealtimeTodosChrono />


      </Tab>
      <Tab key="videos" title="Videos">
        <Card>
          <CardBody>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  </div>
  </>
  );
}
