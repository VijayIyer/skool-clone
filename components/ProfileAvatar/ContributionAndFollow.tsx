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
  handleClickFollowing: () => void;
}

export default function ContributionAndFollow({
  contributions,
  followers,
  following,
  handleClickContributions,
  handleClickFollowers,
  handleClickFollowing,
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
        <StackItem
          onClick={handleClickContributions}
          elevation={0}
          role="button"
          tabIndex={4} // Make it focusable
          aria-label="Click to view contributions"
        >
          <CustomTypography>{contributions}</CustomTypography>
          <Typography variant="body2">Contributions</Typography>
        </StackItem>
        <StackItem
          onClick={handleClickFollowers}
          elevation={0}
          role="button"
          tabIndex={5} // Make it focusable
          aria-label="Click to view followers"
        >
          <CustomTypography>{followers}</CustomTypography>
          <Typography variant="body2">Followers</Typography>
        </StackItem>
        <StackItem
          onClick={handleClickFollowing}
          elevation={0}
          role="button"
          tabIndex={6} // Make it focusable
          aria-label="Click to view following"
        >
          <CustomTypography>{following}</CustomTypography>
          <Typography variant="body2">Following</Typography>
        </StackItem>
      </Stack>
    </section>
  );
}
