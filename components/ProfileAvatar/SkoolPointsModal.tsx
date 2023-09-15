import React from "react";

//Mui Imports
import useModalController from "@/hooks/useModalController";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

//modal style css
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SkoolPointsModal() {
  const [isModalOpen, handleModalOpen, handleModalClose] = useModalController();
  return (
    <span>
      <HelpOutlineIcon onClick={handleModalOpen} />
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h1">
            Skool points
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Typography variant="h6" component="h2">
              Levels
            </Typography>
            As you gain points, you level up. Your level is shown at the bottom
            right of your avatar. The number of points required to get to the
            next level is shown under your avatar on your profile page.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Typography variant="h6" component="h2">
              Points
            </Typography>
            You earn points when other members like your posts or comments. 1
            like = 1 point. This encourages users to produce quality content and
            interact with other members in their community.
          </Typography>
          <Typography>
            Level 1 - 0 points Level 2 - 5 points Level 3 - 20 points Level 4 -
            65 points Level 5 - 155 points Level 6 - 515 points Level 7 - 2,015
            points Level 8 - 8,015 points Level 9 - 33,015 points
          </Typography>
        </Box>
      </Modal>
    </span>
  );
}
