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
const pieParams = { height: 220, width: 220 };
const palette = ["purple", "gray"];

// const StyledLevelRing = styled(PieChart)(({ theme }) => ({
//   position: "absolute",
// }));

export default function AvatarWithBadge({ user }) {
  return (
    <section>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={<Typography>{user.level}</Typography>}
        // variant="dot"
      >
        <Avatar
          alt={user.fullName}
          // src={user.avatarUrl}
          src="/2b_avatar.jpg"
          sx={{ width: 200, height: 200 }}
        />
        {/* <div> */}
        {/* <StyledLevelRing */}

        {/* </div> */}
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
