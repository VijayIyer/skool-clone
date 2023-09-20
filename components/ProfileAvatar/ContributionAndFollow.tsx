import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const StackItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.bodyTypography2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const HeaderTypography = styled(Typography)(() => ({
  color: "#202124",
  fontSize: "18px",
  fontWeight: "500",
}));

const BodyTypography = styled(Typography)(() => ({
  color: "#909090",
  fontSize: "13px",
  fontWeight: "normal",
}));

export default function ContributionAndFollow({ user }) {
  return (
    <section>
      <Stack
        direction="row"
        justifyContent="space-between"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <StackItem elevation={0}>
          <HeaderTypography>{user.contributions}</HeaderTypography>
          <BodyTypography>Contributions</BodyTypography>
        </StackItem>
        <StackItem elevation={0}>
          <HeaderTypography>{user.followers}</HeaderTypography>
          <BodyTypography> Followers</BodyTypography>
        </StackItem>
        <StackItem elevation={0}>
          <HeaderTypography>{user.following}</HeaderTypography>
          <BodyTypography> Following</BodyTypography>
        </StackItem>
      </Stack>
    </section>
  );
}
