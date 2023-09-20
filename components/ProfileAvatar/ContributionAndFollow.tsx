import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const StackItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CustomTypography = styled(Typography)({
  color: "#202124",
  fontSize: "18px",
  fontWeight: "500",
});

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
  console.log(contributions);

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
