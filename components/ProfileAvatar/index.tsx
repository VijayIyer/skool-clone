import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { AvatarWithBadge } from "./Avatar";
import ProfileTimeStamp from "./ProfileTimeStamp";
import ContributionAndFollow from "./ContributionAndFollow";
import { EditOrFollowButton } from "./EditOrFollowButton";
import NameAndBio from "./NameAndBio";

const PaperContainer = styled(Paper)(({ theme }) => ({
  width: 273,
  height: 628.5,
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

export default function ProfileAvatar({
  user,
  isAccounOwner,
  handleClickEditProfile,
  handleClickFollow,
}) {
  console.log(user);

  return (
    <PaperContainer>
      <AvatarWithBadge user={user} />
      <NameAndBio user={user} />

      <Divider variant="middle" sx={{ margin: "20px 0 20px 0" }} />
      <ProfileTimeStamp user={user} />
      <Divider variant="middle" sx={{ margin: "20px 0 5px 0" }} />
      <ContributionAndFollow {...user} />

      <Divider variant="middle" sx={{ margin: "5px 0 20px 0" }} />

      <EditOrFollowButton
        isAccountOwner={true}
        handleClickEditProfile={handleClickEditProfile}
        handleClickFollow={handleClickFollow}
      />
    </PaperContainer>
  );
}
