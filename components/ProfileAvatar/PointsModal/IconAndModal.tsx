import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import ModalContent from "./ModalContent";
import ModalWrapper from "./ModalWrapper";
import { styled } from "@mui/material/styles";

const IconAndModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const CancelButtonIcon = styled(CancelIcon)({
    color: "white",
    fontSize: 50,
    "&:hover": { color: "black" },
  });

  return (
    <>
      <IconButton aria-label="open the modal" onClick={handleModalOpen}>
        <HelpOutlineIcon color="disabled" fontSize="small" />
      </IconButton>
      <ModalWrapper open={isModalOpen} onClose={handleModalClose}>
        <>
          <IconButton onClick={handleModalClose} aria-label="close the modal">
            <CancelButtonIcon />
          </IconButton>
          <ModalContent />
        </>
      </ModalWrapper>
    </>
  );
};

export default IconAndModal;
