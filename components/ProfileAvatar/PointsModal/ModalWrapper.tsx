// Modal.tsx
import React from "react";
import Modal from "@mui/material/Modal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-testid="modal-wrapper"
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
