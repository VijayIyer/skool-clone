import React from "react";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

import { BlueTextTypography } from "../StyledComponents";

export default function Levels({ user, levelPageLink }) {
  return (
    <Box sx={{ margin: "5px 0 0  " }}>
      <Link href={levelPageLink} underline="hover">
        <BlueTextTypography variant="subtitle1">
          {`Level ${user.level}`}
        </BlueTextTypography>
      </Link>
    </Box>
  );
}
