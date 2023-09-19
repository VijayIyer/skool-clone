import React from "react";

import { PieChart } from "@mui/x-charts/PieChart";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import SkoolPointsModal from "./SkoolPointsModal";
import CircularProgress from "@mui/material/CircularProgress";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box } from "@mui/material";

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

//react chart

ChartJS.register(ArcElement, Tooltip, Legend);

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

export default function AvatarWithBadge({ user }) {
  const curPoints = user.points;
  const leftPointsToLevelUp = levelPoints[user.level + 1] - user.points;

  const data = {
    datasets: [
      {
        data: [curPoints, leftPointsToLevelUp],
        backgroundColor: ["rgba(90, 34, 139, 1)", "rgba(189, 195, 199,1)"],
        // borderWidth: 1,
      },
    ],
  };

  return (
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
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={<Typography>{user.level}</Typography>}
              >
                <Avatar
                  alt={user.fullName}
                  // src={user.avatarUrl}
                  src="/2b_avatar.jpg"
                  sx={{
                    width: 200,
                    height: 200,
                    border: "10px solid lightgray",
                  }}
                />
              </StyledBadge>
              <Box
                sx={{
                  position: "absolute",
                  top: "0px",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={90}
                  color="secondary"
                  size={220}
                  thickness={2}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <div>
          <Link href="#" underline="hover" color="primary">
            {`Level ${user.level}`}
          </Link>
        </div>
        <div>
          <span>{leftPointsToLevelUp}</span> {"points to level up"}
          <SkoolPointsModal />
        </div>
      </Box>
    </section>
  );
}
