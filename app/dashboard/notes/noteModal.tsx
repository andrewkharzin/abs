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
  const supabase = createClientComponentClient<Database>()
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    // Fetch categories from database
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from('categories').select('id, name');
        if (error) {
          throw error;
        }
        if (data) {
          const categories = data.map((category: any) => ({
            value: category.id,
            label: category.name
          }));
          setCategories(categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    // Fetch users from database
    // const fetchUsers = async () => {
    //   try {
    //     const { data, error } = await supabase.from('users').select('id, username');
    //     if (error) {
    //       throw error;
    //     }
    //     if (data) {
    //       const users = data.map((user: any) => ({
    //         value: user.id,
    //         label: user.username
    //       }));
    //       setUsers(users);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching users:', error.message);
    //   }
    // };

    fetchCategories();
    // fetchUsers();
  }, []); // Fetch data only once when component mounts



  const handleNoteAdded = () => {

    if (onNoteAdded) {
      onNoteAdded();
    }
    // Close the modal
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
          <Card className="max-w-[340px]">

            <CardBody className="px-3 py-0 text-small text-default-400">
             <CreateNoteForm onNoteAdded={handleNoteAdded} />
             
            </CardBody>
          </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNoteModal;
