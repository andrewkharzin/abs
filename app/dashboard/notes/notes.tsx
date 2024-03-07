"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from 'react';
import RealtimeTodos from "./asyncNotes";
import RealtimeNoteUsers from "./asyncNotesUsers";
import RealtimeTodosChrono from "./renders/noteChrono";
import { GoTasklist } from "react-icons/go";
import AddNoteModal from './noteModal';
import {Tabs, Tab, Card, CardBody, CardHeader, Button} from "@nextui-org/react";
import Skeleton from "./loading/note_skeleton"
import ShareToMe from "./renders/SharedToMe"
import MyShares from "./renders/MyShares";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set the delay in milliseconds (e.g., 2000 for 2 seconds)

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);


  return (
    <>
    <AddNoteModal isOpen={isModalOpen} onClose={toggleModal} />
    <div className="flex w-full flex-col">
    <Tabs disabledKeys={["timeline"]} aria-label="Options" color="primary" variant="bordered">
      <Tab key="notes"
          title={
            <div className="flex items-center space-x-2">
              <GoTasklist />
              <span>Notes</span>
            </div>
          }
        >
        {loading ? (
          <div><Skeleton /></div>
        ) : (

          <RealtimeTodos />
        )}
      </Tab>
      <Tab key="timeline" title="Timeline" className="py-2">


      <RealtimeTodosChrono />


      </Tab>
      <Tab key="e" title="SharedToMe">
        <Card>
          <CardBody>
          <ShareToMe />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="c" title="My Shares">
        <Card>
          <CardBody>
             <MyShares />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  </div>
  </>
  );
}
