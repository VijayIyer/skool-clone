import React from "react";

import { PieChart } from "@mui/x-charts/PieChart";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import SkoolPointsModal from "./SkoolPointsModal";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

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
// //pichart
const pieParams = {
  height: 220,
  width: 220,
  margin: { right: 10 },
};
const palette = ["purple", "gray"];

// const StyledLevelRing = styled(PieChart)(({ theme }) => ({
//   position: "absolute",
// }));

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
        borderWidth: 1,
      },
    ],
  };

  return (
    <section>
      {/* Mui pie chart */}
      {/* <PieChart
        series={[
          {
            data: [{ value: 1 }, { value: 99 }],
            innerRadius: 90,
            outerRadius: 100,
          },
        ]}
        colors={palette}
        {...pieParams}
      ></PieChart> */}
      <Pie data={data} />
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={<Typography>{user.level}</Typography>}
      >
        <Avatar
          alt={user.fullName}
          src={user.avatarUrl}
          // src="/2b_avatar.jpg"
          sx={{ width: 200, height: 200 }}
        />
      </StyledBadge>
      <div>
        <Link href="#" underline="hover" color="primary">
          {`Level ${user.level}`}
        </Link>
      </div>
      <div>
        <span>5</span> {"points to level up"}
        <SkoolPointsModal />
      </div>
    </section>
  );
}
