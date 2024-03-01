'use client'

import React from 'react';
import { Card, CardHeader, Image, Button, CardFooter, CardBody } from '@nextui-org/react';
import { Chip } from "@nextui-org/react";
// import { useRouter } from 'next/router';
import { Tables } from '@/types/supabase';
import { useRouter } from "next/navigation";
import { Database } from '@/types/supabase'
import { FaRegCalendarAlt } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { FaBarsProgress } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spacer, Avatar} from "@nextui-org/react";


interface NoteItemProps {
  note: Tables<'todos'>;
  profile: Tables<'profiles'>;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, profile }) => {
  const router = useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  const insertedAt = new Date(note.inserted_at);
  const formattedDate = insertedAt.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  // Splitting the formattedDate into its components
  const [datePart, timePart] = formattedDate.split(', ');
  let [day, month, year] = datePart.split(' ');
  if (month === 'undefined') {
    // If month is undefined, set it to an empty string
    month = '';
  }
  const time = timePart.slice(0, -3); // Removing seconds from the time

  // Format the date with calendar and clock icons
  const formattedDateTime = (
    <div className="flex flex-row">
      <div className="mt-0"><FaRegCalendarAlt /></div>
      <div className='mx-2'>{formattedDate.split(',')[1].trim()} {/* Date */}</div>
      <div>{formattedDate.split(',')[0].trim()} {/* Time */}</div>
    </div>
  );

  // const handleShowDetail = () => {
  //   router.push(`/notes/${note.id}`);

  // };

  const handleShowDetail = () => {
    router.push(`/notes/${String(note.id)}`);
  };


  // Construct the correct avatar URL
  const avatarUrl = profile ? `https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}` : '';
  const username = profile?.username

  return (
    <Card key={note.id}
          isFooterBlurred
          className="w-full h-[100px] sm:col-span-4 lg:col-span-6"
          shadow="sm"
          >
      <CardHeader className="absolute z-10 flex-col items-start dark:bg-black/60">

         <div className='col-span-3'>
          <h4 className="text-base font-bold font-roboto text-sm">{note.title}</h4>

         </div>
         <div>

         </div>
      </CardHeader>
      {/* <CardBody>
         <article className="justyfy-content mt-10">
          <p className='font-light text-slate-800/40 font-roboto text-md'>
            {note.content}
          </p>
         </article>
      </CardBody> */}
      <Spacer y={10} />
      <CardFooter className="justify-between">
        <div className="flex gap-5">
            <Avatar
              alt="User"
              radius="sm"
              isBordered
              size="md"
              color="danger"
              className="w-10 bg-black"
              src={avatarUrl}
              // src="https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/e41c59dd-bd6e-45bf-8231-a2f5b83923b7-0.057407847982706706.png?t=2024-02-24T07%3A46%3A18.081Z"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600 mb-0">{username}</h4>
            <Chip variant="dot" className="uppercase font-roboto text-xs text-default-400" size='sm' radius="sm" color={note.category === 'URGENT' ? 'danger' : note.category === 'SHIFT' ? 'warning' : 'success'}>{note.category}</Chip>
            </div>
              <span className="text-xs font-roboto dark:text-cyan-500">{formattedDateTime}</span>

          </div>
        <div className="grid grid-cols-2 gap-4">

        <span onClick={onOpen} className='cursor-pointer hover:text-pink-600'><FaBarsProgress size="20px"/></span>
        <span onClick={handleShowDetail} className='cursor-pointer hover:text-pink-600'><FaBarsStaggered size="20px"/></span>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{note.title}</ModalHeader>
              <ModalBody>
                <article>
                  <p>
                     {note.content}
                  </p>
                </article>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </CardFooter>
    </Card>

  );
};

export default NoteItem;
