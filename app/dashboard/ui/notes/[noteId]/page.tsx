"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import NoteDetails from '@/components/notes/NoteDetailPage';

type Note = Database['public']['Tables']['todos']['Row'];

interface NotePageProps {
  params: {
    noteId: string;
  };
}

const NotePage: React.FC<NotePageProps> = ({ params }) => {
  const supabase = createClient();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from<Note>('todos')
        .select('*')
        .eq('id', params.noteId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setNote(data);
    };

    fetchNote();
  }, [params.noteId]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return <NoteDetails note={note} />;
};

export default NotePage;
