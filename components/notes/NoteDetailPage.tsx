"use client";
import React from 'react'
import { useEffect, useState } from 'react';
import { createClient} from "@/utils/supabase/client"
import { Tables } from '@/types/supabase';

interface Note {
  title: string

}

async function NoteDetailPage({ noteId }: {noteId: string}) {
  const supabase = createClient();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    try {
    const fetchNote = async () => {
      try {
        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .eq('id', noteId)
          .single();

        if (error) {
          console.error('Error fetching note:', error.message);
          return;
        }

        if (!data) {
          console.error('Note not found');
          return;
        }

        setNote(data);
      } catch (error) {
        console.error('Error fetching note:', error.message);
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, []);

  
 }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Note details</h1>
      <label>Title: {note.title} </label>
      <label>Content: {note.content} </label>
      <label>Category: {note.category} </label>
      <label>User ID: {note.user_id} </label>
    </>
  );
}

export default NoteDetailPage;
