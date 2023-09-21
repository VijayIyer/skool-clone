import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ModalContent from "./ModalContent";
import ModalWrapper from "./ModalWrapper";

import { CancelButtonIcon } from "../StyledComponents";

const IconAndModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="Open Skool Points modal"
        onClick={handleModalOpen}
      >
        <HelpOutlineIcon color="disabled" fontSize="small" />
      </IconButton>
      <ModalWrapper open={isModalOpen} onClose={handleModalClose}>
        <>
          <IconButton
            onClick={handleModalClose}
            aria-label="Close Skool Points modal"
          >
            <CancelButtonIcon />
          </IconButton>
          <ModalContent />
        </>
      </ModalWrapper>
    </>
  );
};

export default IconAndModal;
