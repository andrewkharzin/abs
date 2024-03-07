import { useState } from "react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button } from "@nextui-org/react";

interface NoteDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const NoteDeleteModal: React.FC<NoteDeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteNote = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalHeader>
        <p>
          Delete note
        </p>
      </ModalHeader>
      <ModalBody>
        <p>
          Are you sure you want to delete this note?
        </p>
      </ModalBody>
      <ModalFooter>
        <Button
          auto
          flat
          color="error"
          isLoading={isDeleting}
          onPress={handleDeleteNote}
        >
          Delete
        </Button>
        <Button
          auto
          flat
          onPress={onClose}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NoteDeleteModal;
