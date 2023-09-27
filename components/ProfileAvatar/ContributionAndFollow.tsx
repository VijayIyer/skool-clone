import React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { StackItem, CustomTypography } from "./StyledComponents";

interface ContributionAndFollowProps {
  contributions: number;
  followers: number;
  following: number;
}

export default function ContributionAndFollow({
  contributions,
  followers,
  following,
}: ContributionAndFollowProps) {
  return (
    <section>
      <Stack
        direction="row"
        justifyContent="space-between"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <StackItem elevation={0}>
          <CustomTypography>{contributions}</CustomTypography>
          <Typography variant="body2">Contributions</Typography>
        </StackItem>
        <StackItem elevation={0}>
          <CustomTypography>{followers}</CustomTypography>
          <Typography variant="body2">Followers</Typography>
        </StackItem>
        <StackItem elevation={0}>
          <CustomTypography>{following}</CustomTypography>
          <Typography variant="body2">Following</Typography>
        </StackItem>
      </Stack>
    </section>
  );
}
