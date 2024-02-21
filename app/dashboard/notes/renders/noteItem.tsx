import React from 'react';
import { Card, CardHeader, Image, Button, CardFooter, CardBody } from '@nextui-org/react';
import { Chip } from "@nextui-org/react";
import { Tables } from '@/types/supabase';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spacer} from "@nextui-org/react";


interface NoteItemProps {
  note: Tables<'todos'>; // Use the imported type for the note prop
}

const formatDate = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return formattedDate;
};

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const insertedAt = new Date(note.inserted_at);
  const formattedDate = insertedAt.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });


  return (
    <Card key={note.id} isFooterBlurred className="w-full h-[135px] sm:col-span-4 lg:col-span-6">
      <CardHeader className="absolute z-10 flex-col items-start dark:bg-black/90">

         <div className='col-span-3'>
          <h4 className="text-base font-bold font-roboto text-sm">{note.title}</h4>

         </div>
         <div>

         </div>
      </CardHeader>
      {/* <CardBody>
         <article className="mx-auto justyfy-content mt-20">
          <p className='font-light font-roboto text-md'>
            {note.content}
          </p>
         </article>
      </CardBody> */}
      <CardFooter className="absolute dark:bg-black/60 dg-white bottom-0 z-10">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            radius='md'
            className="w-10 bg-black"
            src="https://masterpiecer-images.s3.yandex.net/f3247d0eaed211ee9e407e3ceed934b2:upscaled"
          />
          <div className="flex flex-col">
            {/* <h4 className="text-cyan-600 font-medium text-xs">{note.title}</h4> */}
            <Spacer />
            <div className="flex flec-col flex-wrap">
             <div>

                <p className="text-tiny text-roboto uppercase dark:text-cyan-400 text-cyan-600 font-light">{formattedDate}</p>

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
