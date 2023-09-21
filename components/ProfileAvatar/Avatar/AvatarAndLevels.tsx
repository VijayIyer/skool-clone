import React from "react";

import Box from "@mui/material/Box";

import Levels from "./Levels";
import Experience from "./Experience";
import AvatarWithBadge from "./AvatarWithBadge";
import { flexCenterStyle } from "../StyledComponents";
import { UserProps } from "../";

interface LevelPointsProp {
  [level: number]: number;
}

const levelPoints: LevelPointsProp = {
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

interface AvatarAndLevelsProps {
  user: UserProps;
  levelPageLink?: string;
}

export default function AvatarAndLevels({
  user,
  levelPageLink = "#",
}: AvatarAndLevelsProps) {
  const currentUserPoints = user.points;
  const curPointsPercentage = Math.floor(
    (currentUserPoints / levelPoints[user.level + 1]) * 100
  );

  return (
    <Box
      sx={{
        flexDirection: "column",
        ...flexCenterStyle,
      }}
    >
      <AvatarWithBadge curPointsPercentage={curPointsPercentage} {...user} />
      <Levels levelPageLink={levelPageLink} {...user} />
      <Experience curPointsPercentage={curPointsPercentage} />
    </Box>
  );
}
