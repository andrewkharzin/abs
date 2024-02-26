"use client"

import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, Spacer, Select, SelectItem} from "@nextui-org/react";
import CreateNoteForm from './CreateNoteForm'; // Assuming you have a CreateNoteForm component
import { Database } from '@/types/supabase'
import { createClient } from "@/utils/supabase/client";
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'


interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteAdded: () => void;
  userId: string; // Assuming you pass the user ID to this component
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onNoteAdded,  userId }) => {



  // const handleNoteAdded = () => {
  //   if (onNoteAdded) {
  //     onNoteAdded();
  //   }
  //   // Close the modal
  //   onClose();
  // };
  const handleNoteAdded = () => {
    if (onNoteAdded) {
      onNoteAdded();
    }
  };

  const handleClose = () => {
    handleNoteAdded();
    onClose();
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button onClick={onClose}>Add Note</Button>
      <Spacer y={4} />
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add Note</ModalHeader>
          <ModalBody>



            <CreateNoteForm onNoteAdded={handleClose} />



          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNoteModal;
