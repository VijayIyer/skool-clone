import React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { StackItem, CustomTypography } from "./StyledComponents";

interface ContributionAndFollowProps {
  contributions: number;
  followers: number;
  following: number;
  handleClickContributions: () => void;
  handleClickFollowers: () => void;
  handleClickFolling: () => void;
}

export default function ContributionAndFollow({
  contributions,
  followers,
  following,
  handleClickContributions,
  handleClickFollowers,
  handleClickFolling,
}: ContributionAndFollowProps) {
  return (
    <section>
      <Stack
        direction="row"
        justifyContent="space-around"
        divider={
          <Divider orientation="vertical" flexItem sx={{ width: "9px" }} />
        }
      >
        <StackItem onClick={handleClickContributions} elevation={0}>
          <CustomTypography>{contributions}</CustomTypography>
          <Typography variant="body2">Contributions</Typography>
        </StackItem>
        <StackItem onClick={handleClickFollowers} elevation={0}>
          <CustomTypography>{followers}</CustomTypography>
          <Typography variant="body2">Followers</Typography>
        </StackItem>
        <StackItem onClick={handleClickFolling} elevation={0}>
          <CustomTypography>{following}</CustomTypography>
          <Typography variant="body2">Following</Typography>
        </StackItem>
      </Stack>
    </section>
  );
}
