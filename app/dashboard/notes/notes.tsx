// // notes.tsx

import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import NotesList from './notesList';
import AddNoteModal from './noteModal';
import { getAllNotes, createNote } from './noteCrud'; // Import functions for fetching and creating notes

type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []); // Fetch notes on component mount

  const fetchNotes = async () => {
    // Fetch all notes from the server
    const fetchedNotes: Note[] = await getAllNotes();
    setNotes(fetchedNotes);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNoteAdded = async (title: string, content: string) => {
    // Create a new note and add it to the list
    await createNote(title, content);
    // Fetch updated list of notes
    fetchNotes();
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div>
      <AddNoteModal isOpen={isModalOpen} onClose={toggleModal} onNoteAdded={handleNoteAdded} />
      <NotesList key={notes.length} notes={notes} />
    </div>
  );
};

export default Notes;

