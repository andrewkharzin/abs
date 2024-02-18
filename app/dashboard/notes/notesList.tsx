//notesList.tsx

import { useEffect, useState } from 'react';
import { getAllNotes } from './noteCrud';
import { Card, CardHeader, CardBody } from '@nextui-org/react';

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const NotesList: React.FC = () => {
  // const { notes, setNotes } = useNotesContext();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const notesData = await getAllNotes();
      setNotes(notesData);
    }

    fetchNotes();
  }, []);

  return (
    <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2">
      {notes.map(note => (
        <Card key={note.id} className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col bg-black/60 items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">POSTED: {new Date(note.created_at).toLocaleString()}</p>
            <h4 className="text-white font-medium text-cyan-700 dark:text-cyan-400 text-large">{note.title}</h4>
          </CardHeader>
          <CardBody className="mx-auto mt-20">
            <article className="text-balance mx-auto">
              <p>{note.content}</p>
            </article>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default NotesList;
