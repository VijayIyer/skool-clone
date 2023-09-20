import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "454px",
  bgcolor: "background.paper",
  border: "1px solid rgb(228, 228, 228)",
  borderRadius: "10px",
  color: "rgb(32,33,36)",
  p: 4,
  lineHeight: 1.5,
};

const ModalHeader = styled(Typography)({
  fontWeight: "bold",
  fontSize: "23px",
  margin: "0 0 16px 0",
});

const ModalSubHeader = styled(Typography)({
  fontWeight: "bold",
  fontSize: "16px",
  margin: "0 0 4px 0",
});

const ModalParagraph = styled(Typography)({
  margin: "0 0 16px 0",
});

const ModalContent: React.FC = () => {
  return (
    <Box sx={modalStyle}>
      <ModalHeader id="modal-modal-title" variant="h5">
        Skool points
      </ModalHeader>
      <ModalSubHeader variant="h6">Points</ModalSubHeader>
      <ModalParagraph id="modal-modal-description">
        You earn points when other members like your posts or comments. 1 like =
        1 point. This encourages users to produce quality content and interact
        with other members in their community.
      </ModalParagraph>
      <ModalSubHeader variant="h6">Levels</ModalSubHeader>
      <ModalParagraph id="modal-modal-description">
        As you gain points, you level up. Your level is shown at the bottom
        right of your avatar. The number of points required to get to the next
        level is shown under your avatar on your profile page.
      </ModalParagraph>

      <Stack direction="row" spacing={10}>
        <Box>
          <Typography>Level 1 - 0 points</Typography>
          <Typography>Level 2 - 5 points</Typography>
          <Typography>Level 3 - 20 points</Typography>
          <Typography>Level 4 - 65 points</Typography>
          <Typography>Level 5 - 155 points</Typography>
        </Box>
        <Box>
          <Typography>Level 6 - 515 points</Typography>
          <Typography>Level 7 - 2,015 points</Typography>
          <Typography>Level 8 - 8,015 points</Typography>
          <Typography>Level 9 - 33,015 points</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ModalContent;
