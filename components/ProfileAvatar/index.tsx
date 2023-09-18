import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import AvatarWithBadge from "./AvatarWithBadge";
import ProfileTimeStamp from "./ProfileTimeStamp";

const PaperContainer = styled(Paper)(({ theme }) => ({
  width: 273,
  height: 628.5,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  // textAlign: "center",
}));

const StackItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProfileAvatar({ user }) {
  console.log(user);

  return (
    <PaperContainer>
      <AvatarWithBadge user={user} />
      <section>
        <Typography variant="h5" component="h1">
          {user.fullName}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {user.url}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.bio}
        </Typography>
      </section>
      <Divider variant="middle" />
      <ProfileTimeStamp user={user} />
      <Divider variant="middle" />
      <section>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <StackItem elevation={0}>
            <Typography>{user.contributions}</Typography>
            <Typography>Contributions</Typography>
          </StackItem>
          <StackItem elevation={0}>
            <Typography>{user.followers}</Typography>
            <Typography> Followers</Typography>
          </StackItem>
          <StackItem elevation={0}>
            <Typography>{user.following}</Typography>
            <Typography> Following</Typography>
          </StackItem>
        </Stack>
      </section>
      <Divider variant="middle" />
      <Button variant="contained">FOLLOW</Button>
    </PaperContainer>
  );
}
