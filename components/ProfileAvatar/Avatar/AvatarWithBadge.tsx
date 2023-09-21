import React from "react";

// import { styled } from "@mui/material/styles";
// import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {
  flexCenterStyle,
  StyledBadge,
  GrayCircularProgress,
} from "../StyledComponents";

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     backgroundColor: "#4357ad",
//     color: "#ffffff",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     width: "48px",
//     height: "48px",
//     borderRadius: "50%",
//   },
// }));

// const GrayCircularProgress = styled(CircularProgress)(({ theme }) => ({
//   color: theme.palette.text.secondary,
// }));

interface AvatarWithBadge {
  curPointsPercentage: number;
  level: number;
  fullName: string;
  avatarUrl: string;
}

export default function AvatarWithBadge({
  curPointsPercentage,
  level,
  fullName,
  avatarUrl,
}: AvatarWithBadge) {
  return (
    <Box
      sx={{
        flexDirection: "column",
        ...flexCenterStyle,
      }}
    >
      <Box
        sx={{
          position: "relative",
          ...flexCenterStyle,
        }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<Typography variant="h4">{level}</Typography>}
        >
          <Avatar
            alt={fullName}
            src={avatarUrl}
            sx={{
              width: 200,
              height: 200,
              border: "10px solid transparent",
            }}
          />
        </StyledBadge>
        <Box
          sx={{
            position: "absolute",
            top: "0px",
          }}
        >
          <GrayCircularProgress
            variant="determinate"
            value={100}
            color="warning"
            size={220}
            thickness={1.5}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "0px",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={curPointsPercentage}
            color="secondary"
            size={220}
            thickness={1.5}
          />
        </Box>
      </Box>
    </Box>
  );
}
