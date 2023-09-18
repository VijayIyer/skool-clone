import React from "react";

import { PieChart } from "@mui/x-charts/PieChart";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import SkoolPointsModal from "./SkoolPointsModal";

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
//pichart
const pieParams = {
  height: 220,
  width: 220,
  margin: { right: 10 },
};
const palette = ["purple", "gray"];

// const StyledLevelRing = styled(PieChart)(({ theme }) => ({
//   position: "absolute",
// }));

export default function AvatarWithBadge({ user }) {
  return (
    <section>
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
