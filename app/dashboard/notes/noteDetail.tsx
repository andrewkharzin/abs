import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';


interface Note {
  id: number;
  title: string;
  content: string;
  // Add other properties as needed
}


const NoteDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState<Note[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setNote(data);
        }
      } catch (error) {
        console.error('Error fetching note:', error.message);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <p>{note.title}</p>
  );
};

export default NoteDetail;
