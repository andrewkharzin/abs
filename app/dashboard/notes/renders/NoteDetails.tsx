import React from 'react';
import { Note } from '@/types/supabase';

interface NoteDetailsProps {
  note: Note;
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ note }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      <p className="text-gray-600 mb-4">{note.content}</p>
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">Category:</span>
        <span className={`text-sm font-medium py-1 px-2 rounded-full ${getCategoryColor(note.category)}`}>
          {note.category}
        </span>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-gray-500">Created at:</span>
        <span className="text-gray-600">{new Date(note.inserted_at).toLocaleString()}</span>
      </div>
      {/* Add more note details as needed */}
    </div>
  );
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'URGENT':
      return 'bg-red-500 text-white';
    case 'SHIFT':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-green-500 text-white';
  }
};

export default NoteDetails;
