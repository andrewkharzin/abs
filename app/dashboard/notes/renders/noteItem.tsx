'use client'

import React from 'react';
import { Card, CardHeader, Image, Button, CardFooter, CardBody } from '@nextui-org/react';
import { Chip } from "@nextui-org/react";
import { Tables } from '@/types/supabase';
import { useRouter } from "next/navigation";
import { Database } from '@/types/supabase'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spacer} from "@nextui-org/react";


interface NoteItemProps {
  note: Tables<'todos'>;
  profile: Tables<'profiles'>;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, profile }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();


  const insertedAt = new Date(note.inserted_at);
  const formattedDate = insertedAt.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });

  // Construct the correct avatar URL
  const avatarUrl = profile ? `https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}` : '';

  return (
    <Card key={note.id}
          isFooterBlurred
          className="w-full h-[230px] sm:col-span-4 lg:col-span-6"
          shadow="md"
          >
      <CardHeader className="absolute z-10 flex-col items-start dark:bg-black/60">

         <div className='col-span-3'>
          <h4 className="text-base font-bold font-roboto text-sm">{note.title}</h4>

         </div>
         <div>

         </div>
      </CardHeader>
      <CardBody>
         <article className="mx-auto justyfy-content mt-10">
          <p className='font-light font-roboto text-md'>
            {note.content}
          </p>
         </article>
      </CardBody>

      <CardFooter className="absolute dark:bg-black/80 bottom-0 z-10">
        <div className="flex flex-grow gap-2 items-center">
          {/* // User Profile image */}
          <Image
            alt="Breathing app icon"
            radius='md'
            className="w-10 bg-black"
            src={avatarUrl}
            // src="https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/e41c59dd-bd6e-45bf-8231-a2f5b83923b7-0.057407847982706706.png?t=2024-02-24T07%3A46%3A18.081Z"


          />
          <div className="flex flex-col">
            {/* <h4 className="text-cyan-600 font-medium text-xs">{note.title}</h4> */}
            <Spacer />
            <div className="flex flec-col flex-wrap">
             <div>

                <p className="font-roboto uppercase dark:text-base text-cyan-700 font-light">{formattedDate}</p>

              </div>
                <span>{"  "}</span>
                {/* <p className="text-tiny italic text-cyan-600">Andrew KHZ</p> */}
             <div>

             </div>
            </div>
            <Spacer />
            <p className="text-tiny text-white/60"></p>
            <Spacer />
      <Chip variant="dot" size='sm' rounded="none" color={note.category === 'URGENT' ? 'danger' : note.category === 'SHIFT' ? 'warning' : 'success'}>{note.category}</Chip>
          </div>
        </div>
        <Button color="primary" variant="flat" onPress={onOpen} radius="sm" size="sm">Show</Button>
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
