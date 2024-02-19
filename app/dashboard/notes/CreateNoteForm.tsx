import React, { useState } from 'react';
import { createNote } from './noteCrud';
import {Input, Button, Spacer} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import dynamic from 'next/dynamic';

const CreateNoteForm: React.FC<{ onNoteAdded: () => void }> = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNote(title, content);
    // Reset form fields after submission
    setTitle('');
    setContent('');
    // Notify parent component that a new note has been added
    onNoteAdded();
  };

  return (

      <form onSubmit={handleSubmit}>

        <Input
        type="text"
        autoFocus
        value={title}
        label="Title"
        onChange={(e) => setTitle(e.target.value)}
        variant='bordered'
        required
        size='lg'
        />
        <Spacer y={4} />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required // Adding required attribute for validation
        />
        {/* <Button color="primary" variant='ghost'  type="submit">Add Note</Button> */}
        <Button color="primary" size="md" type="submit">
                    Add Note
        </Button>
        <Spacer y={4} />
      </form>

 );
};

export default CreateNoteForm;
