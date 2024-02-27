"use client";

import { useNavigation } from '@/hooks/useNavigation';
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from 'react';
import { Database } from '@/types/supabase';
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getNoteById } from '@/queries/notes/getNoteById';


type Note = Database['public']['Tables']['todos']['Row']

const NoteDetailPage = ({ params }: {params: {id: number}}) => {
  const supabase = createClient()

  const {data: note, isLoading, isError } = useQuery(getNoteById(supabase, params.id))

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    console.error('Error fetching note:', isError.message);
    return null;
  }
  return (
    <div>
      {note.title}
    </div>
  );
};

export default NoteDetailPage;
