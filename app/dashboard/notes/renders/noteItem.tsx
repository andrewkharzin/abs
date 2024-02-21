import React from 'react';
import { Card, CardHeader, Image, Button, CardFooter, CardBody } from '@nextui-org/react';
import { Chip } from "@nextui-org/react";
import { Tables } from '@/types/supabase';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";


interface NoteItemProps {
  note: Tables<'todos'>; // Use the imported type for the note prop
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <Card key={note.id} isFooterBlurred className="w-full h-[270px] sm:col-span-4 lg:col-span-6">
      <CardHeader className="absolute z-10 top-1 flex-col items-start bg-black/90">

         <div className='col-span-3'>
          <span className="text-tiny text-white/60 uppercase font-normal">POST: {" "}{note.inserted_at}</span>
          <h4 className="text-cyan-600 font-medium text-xl">{note.title}</h4>

         </div>
         <div>

         </div>
      </CardHeader>
      <CardBody>
         <article className="mx-auto justyfy-content mt-20">
          <p className='text-tiny font-light font-mono'>
            {note.content}
          </p>
         </article>
      </CardBody>
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            radius='md'
            className="w-10 bg-black"
            src="https://masterpiecer-images.s3.yandex.net/f3247d0eaed211ee9e407e3ceed934b2:upscaled"
          />
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">Andrew KHZ</p>
            <p className="text-tiny text-white/60"></p>
          </div>
      <Chip variant="dot" size='sm' color={note.category === 'URGENT' ? 'danger' : note.category === 'SHIFT' ? 'warning' : 'success'}>{note.category}</Chip>
        </div>
        <Button onPress={onOpen} radius="sm" size="sm">Show</Button>
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
