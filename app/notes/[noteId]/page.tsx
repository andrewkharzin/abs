"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

export default function Note({ params: { id } }: { params: { id: string }}) {
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      if (!id) {
        // Handle the case where id is undefined
        console.error("Note id is undefined.");
        return;
      }

      const supabase = createClient();
      const { data: noteData, error } = await supabase
        .from("todos")
        .select('*')
        .match({ id })
        .single();

      if (error) {
        console.error("Error fetching note:", error);
        return;
      }

      if (!noteData) {
        notFound();
        return;
      }

      setNote(noteData);
      setLoading(false);
    }

    fetchNote();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!note) {
    // Display a proper error message if note is not found
    return <p>Note not found.</p>;
  }

  return (
    <pre>{JSON.stringify(note, null, 2)}</pre>
  );
}
