import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import CreateNoteForm from './CreateNoteForm'; // Assuming you have a CreateNoteForm component


interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteAdded: () => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ isOpen, onClose, onNoteAdded }) => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const handleNoteAdded = () => {

    if (onNoteAdded) {
      onNoteAdded();
    }
    // Close the modal
    onClose();
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button onClick={onClose}>Add Note</Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add Note</ModalHeader>
          <ModalBody>
          <Card className="max-w-[340px]">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                  <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                </div>
              </div>
              <Button
                className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                color="primary"
                radius="full"
                size="sm"
                variant={isFollowed ? "bordered" : "solid"}
                onPress={() => setIsFollowed(!isFollowed)}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </Button>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">

             <CreateNoteForm onNoteAdded={handleNoteAdded} />
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">4</p>
                <p className=" text-default-400 text-small">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">97.1K</p>
                <p className="text-default-400 text-small">Followers</p>
              </div>
            </CardFooter>
          </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNoteModal;
