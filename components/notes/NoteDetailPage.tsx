import React from 'react';
import { Note } from '@/types/supabase';
import { DotsIcon } from "@/app/dashboard/ui/icons/accounts/dots-icon";
import { ExportIcon } from "@/app/dashboard/ui/icons/accounts/export-icon";
import { InfoIcon } from "@/app/dashboard/ui/icons/accounts/info-icon";
import { TrashIcon } from "@/app/dashboard/ui/icons/accounts/trash-icon";
import { HouseIcon } from "@/app/dashboard/ui/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/app/dashboard/ui/icons/breadcrumb/users-icon";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

interface NoteDetailsProps {
  note: Note;
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ note }) => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4 px-2">

    <Breadcrumbs>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem href="/notes">Notes</BreadcrumbItem>
      <BreadcrumbItem>Detail</BreadcrumbItem>
    </Breadcrumbs>
    <h4 className="text-lg font-bold">Details</h4>
    <div className="flex justify-between flex-wrap gap-4 items-center">
      <div className="flex items-center gap-3 flex-wrap md:flex-nowrap px-2">

        {/* <SettingsIcon /> */}
         <TrashIcon />
        <InfoIcon />
        <DotsIcon />
      </div>
      <div className="flex flex-row gap-3.5 flex-wrap">

      </div>
    </div>
    <div className="max-w-[95rem] mx-auto w-full">

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


    </div>
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