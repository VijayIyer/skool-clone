import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
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

// //avatr
// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     backgroundColor: "#4357ad",
//     color: "#ffffff",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     width: "48px",
//     height: "48px",
//     borderRadius: "50%",
//   },
// }));
// //pichart
// const pieParams = { height: 220, width: 220 };
// const palette = ["purple", "gray"];

// // const StyledLevelRing = styled(PieChart)(({ theme }) => ({
// //   position: "absolute",
// // }));

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
