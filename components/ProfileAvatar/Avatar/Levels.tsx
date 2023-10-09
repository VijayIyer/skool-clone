import React from "react";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import { BlueTextTypography } from "../StyledComponents";

interface LevelsProps {
  level: number;
  levelPageLink: string;
}

export default function Levels({ level, levelPageLink }: LevelsProps) {
  return (
    <Box sx={{ margin: "5px 0 0  " }}>
      <Link href={levelPageLink} underline="hover">
        <BlueTextTypography variant="subtitle1">
          {`Level ${level}`}
        </BlueTextTypography>
      </Link>
    </Box>
  );
}
