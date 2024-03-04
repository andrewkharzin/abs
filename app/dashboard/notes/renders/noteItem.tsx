'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Image, Button, CardFooter, CardBody, User } from '@nextui-org/react';
import { Chip } from "@nextui-org/react";
import { Tables } from '@/types/supabase';
import { useRouter } from "next/navigation";
import { Database } from '@/types/supabase'
import { title }  from "@/components/primitives";
import { FaRegCalendarAlt, FaShareAltSquare } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { FaBarsProgress } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spacer, Avatar, Select, SelectItem, Textarea, Spinner} from "@nextui-org/react";
import { supabase } from '@supabase/auth-ui-shared';
import UserItem from "./UserItem";
import GradientMask from './gradientMask';
import MultiUserSelector from './MultiUserSelector';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface NoteItemProps {
  note: Tables<'todos'>;
  profile: Tables<'profiles'>;
  onShare: (noteId: number, userId: string) => void;
  // user: Tables<>
}

// type Profile = Database['public']['Tables']['profiles']['Row'];
// interface ProfileItemProps {
//   profile: Profile;
//   isFollowed: boolean; // Add isFollowed as a prop
//   onFollowToggle: () => void; // Add onFollowToggle as a prop
// }

const NoteItem: React.FC<NoteItemProps> = ({ note, profile, onShare }) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [open, setOpen] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = useState<Profile[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);


  const filteredProfiles = profiles.filter((user) => user.id !== currentUserProfile.id);

  const insertedAt = new Date(note.inserted_at);
  const formattedDate = insertedAt.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, "$1/$2/$3 $4:$5");



  const handleShowDetail = () => {
    router.push(`/notes/${String(note.id)}`);
  };





  const handleClick = () => {
    console.log('Share button clicked');
    onShare(note.id, profile.id, selectedUsers);

    setIsLoading(true);
    setShowMessage(false);


    // Имитация задержки в 2 секунды перед отображением сообщения
    setTimeout(() => {
      setIsLoading(false);
      setShowMessage(true);

      // Скрыть сообщение через дополнительные 2 секунды
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }, 2000);
  };


  const avatarUrl = profile ? `https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${profile.avatar_url}` : '';
  const username = profile?.username;
  const fullName = profile?.full_name;

  return (
    <>

    <Card key={note.id}
          isFooterBlurred
          className="max-w-full"
          shadow="sm">
        <CardHeader className="flex justify-between ">

             <div className="flex-none w-14">

              <Avatar
                alt={username}
                height={40}
                isBordered
                color="danger"
                radius="sm"
                src={avatarUrl}
                width={40}
              />
              </div>
              <div className="grow">
                  <p className="text-md">{fullName}</p>
                  <p className="text-small text-default-500">@{username}</p>
              </div>
          <div className="order-last mr-2">
           <GradientMask />

            <span onClick={onOpen}><FaBarsProgress size="25px" className="relative text-default-400 hover:text-pink-500"  /></span>
              </div>


      </CardHeader>
      <CardBody>

          <p className='font-light text-base font-roboto text-md'>
            {note.content}
          </p>

      </CardBody>
      <Spacer y={10} />
      <CardFooter className="justify-between">
        <div className="flex gap-5">

            <div className="flex flex-col gap-1 items-start justify-center">
            <Chip variant="dot" className="uppercase font-roboto text-xs text-default-400" size='sm' radius="sm" color={note.category === 'URGENT' ? 'danger' : note.category === 'SHIFT' ? 'warning' : 'success'}>{note.category}</Chip>

              <Spacer y={2} />
             <span className="text-xs font-roboto text-default-400">{formattedDate}</span>
            </div>


          </div>
        <div className="grid grid-cols-2 gap-4">

        <span onClick={handleShowDetail} className='cursor-pointer hover:text-pink-600'><FaBarsStaggered size="20px"/></span>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{note.title}</ModalHeader>
                <ModalBody>
                  <div className="flex flex-col">
                    <div>

                    </div>
                    <div>
                    <span className="text-tiny text-base">Assign to</span>
                        <Spacer y={2} />
                      {/* Replace UserItem with MultiUserSelector */}
                <MultiUserSelector onSelect={setSelectedUsers} />
                    {/* <UserItem profile={profile} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/> */}

                      </div>
                      <Spacer y={2} />
                      {/* Display selected users' avatars */}
                      <div className="flex gap-2">

                      </div>



                    <Spacer y={2} />
                    <div>
                    {isLoading && <Spinner />}
                        {showMessage && <div className="justify-content">
                          <p className="text-sm font-bold bg-sky-500/50 uppercase font-roboto font-sans text-foreground ">Note successfully delegated!</p>
                        </div>}
                        <Spacer y={2} />
                      {!isLoading && (

                       <Button
                          onClick={handleClick}

                          startContent={<FaShareAltSquare size="15px" className="text-pink-500"/>}
                          variant="flat"
                        >
                          Assign To
                        </Button>

                      )}
                    </div>

                  </div>
              </ModalBody>
              <ModalFooter>
              <div className="flex flex-col">
                  <div className="flex gap-4 flex-wrap-reverse">
                    {selectedUsers.map((user) => (
                      <Avatar
                        key={user.id}
                        alt={user.username}
                        isBordered
                        size="sm"
                        color="violet"
                        radius="sm"
                        src={`https://teureaztessldmmncynq.supabase.co/storage/v1/object/public/avatars/${user.avatar_url}`}
                      />
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button color="danger" variant="light" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </CardFooter>
    </Card>
   </>
  );
};

export default NoteItem;