import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { IconAndModal } from "../PointsModal";

import { BlueTextTypography, GrayTextTypography } from "../StyledComponents";

interface ExperienceProps {
  curPointsPercentage: number;
}

export default function Experience({ curPointsPercentage }: ExperienceProps) {
  return (
    <Stack direction="row" alignItems="center">
      <Box>
        <BlueTextTypography display="inline">
          {curPointsPercentage}
        </BlueTextTypography>
        <GrayTextTypography display="inline">
          {"\xa0points to level up"}
        </GrayTextTypography>
      </Box>
      <IconAndModal />
    </Stack>
  );
}
