// noteCrud.ts
import { createClient } from '@/utils/supabase/client';
import { Session } from '@supabase/supabase-js';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string; // Add category field
  tags: string[]; // Add tags field
  user_id: string; // Add user_id field
}

export async function createNote(
  title: string,
  content: string,
  category: string,
  tags: string[],
): Promise<Note | null> {
  const supabase = createClient();
  // Retrieve the current user's session


  const { data, error } = await supabase
    .from('todos')
    .insert({ title, content, category, tags })
    .single();

  if (error) {
    console.error('Error creating note:', error.message);
    return null;
  }

  return data;
}


// export async function createNote(title: string, content: string) {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from('todos')
//     .insert({ title, content })
//     .single();

//   if (error) {
//     console.error('Error creating note:', error.message);
//     return null;
//   }

//   return data;
// }

export async function getAllNotes() {
  const supabase = createClient();
  const { data, error } = await supabase.from('todos').select('*');

  if (error) {
    console.error('Error fetching notes:', error.message);
    return [];
  }

  return data;
}

export async function updateNote(id: string, title: string, content: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('todos')
    .update({ title, content })
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error updating note:', error.message);
    return null;
  }

  return data;
}

export async function deleteNote(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) {
    console.error('Error deleting note:', error.message);
    return false;
  }

  return true;
}
