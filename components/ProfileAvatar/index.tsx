import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { AvatarAndLevels, AvatarWithBadge } from "./Avatar";
import NameAndBio from "./NameAndBio";
import { ProfileTimeStamp } from "./TimeStamp";
import ContributionAndFollow from "./ContributionAndFollow";
import { EditOrFollowButton } from "./EditOrFollowButton";

import { PaperContainer } from "./StyledComponents";

export default function ProfileAvatar({
  user,
  isAccounOwner,
  handleClickEditProfile,
  handleClickFollow,
}) {
  console.log(user);

  return (
    <PaperContainer>
      <AvatarAndLevels user={user} />
      <NameAndBio {...user} />

      <Divider variant="middle" sx={{ margin: "20px 0 20px 0" }} />
      <ProfileTimeStamp {...user} isAccountOwner={isAccounOwner} />
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
