import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import {
  modalStyle,
  ModalHeader,
  ModalSubHeader,
  ModalParagraph,
} from "../StyledComponents";

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
