import React from "react";

import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import SkoolPointsModal from "./SkoolPointsModal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { IconAndModal } from "../PointsModal";

//avatr
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#4357ad",
    color: "#ffffff",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: "48px",
    height: "48px",
    borderRadius: "50%",
  },
}));

const GrayCircularProgress = styled(CircularProgress)(() => ({
  color: "rgb(144, 144, 144)",
}));

const BlueTextTypography = styled(Typography)(() => ({
  color: "rgb(67, 87, 173)",
}));

const GrayTextTyppgraphy = styled(Typography)(() => ({
  color: "rgb(144, 144, 144)",
}));

const levelPoints = {
  1: 0,
  2: 5,
  3: 20,
  4: 65,
  5: 155,
  6: 515,
  7: 2015,
  8: 8015,
  9: 33015,
};

export default function AvatarWithBadge({ user, levelPageLink = "#" }) {
  const curPoints = user.points;
  const curPointsPercentage = parseInt(
    (curPoints / levelPoints[user.level + 1]) * 100
  );

  return (
    // <ThemeProvider theme={theme}>
    <section>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<Typography variant="h4">{user.level}</Typography>}
            >
              <Avatar
                alt={user.fullName}
                src={user.avatarUrl}
                // src="/2b_avatar.jpg"
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
        <Box sx={{ margin: "5px 0 0  " }}>
          <Link href={levelPageLink} underline="hover">
            <BlueTextTypography variant="subtitle1">
              {`Level ${user.level}`}
            </BlueTextTypography>
          </Link>
        </Box>
        <Box>
          <Stack direction="row" alignItems="center">
            <Box>
              <BlueTextTypography display="inline">
                {curPointsPercentage}
              </BlueTextTypography>
              <GrayTextTyppgraphy display="inline">
                {"\xa0points to level up"}
              </GrayTextTyppgraphy>
            </Box>
            {/* <SkoolPointsModal /> */}
            <IconAndModal />
          </Stack>
        </Box>
      </Box>
    </section>
  );
}
