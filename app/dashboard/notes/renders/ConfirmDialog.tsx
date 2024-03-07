// ConfirmDialog.tsx

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isDismissable={false}>
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          <p className="text-lg font-bold bg-pink-600/30 text-base">

          </p>
          Are you sure you want to delete this item?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" auto onClick={onConfirm}>Delete</Button>
          <Button auto onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
