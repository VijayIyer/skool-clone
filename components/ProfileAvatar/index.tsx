//go to localhost/3000/componentRender page to see the visual component
import React from "react";

import Divider from "@mui/material/Divider";

import { AvatarAndLevels } from "./Avatar";
import NameAndBio from "./NameAndBio";
import { ProfileTimeStamp } from "./TimeStamp";
import ContributionAndFollow from "./ContributionAndFollow";
import { EditOrFollowButton } from "./EditOrFollowButton";

import { PaperContainer } from "./StyledComponents";

export interface UserProps {
  fullName: string;
  url: string;
  level: number;
  points: number;
  bio: string;
  activeTime: string;
  createdTime: string;
  contributions: number;
  followers: number;
  following: number;
  avatarUrl: string;
}

interface ProfileAvatarProps {
  user: UserProps;
  isAccounOwner: boolean;
  profileHeight?: string;
  profileWidth?: string;
  handleClickEditProfileButton: () => void;
  handleClickFollowButton: () => void;
  handleClickContributions: () => void;
  handleClickFollowers: () => void;
  handleClickFollowing: () => void;
}

export default function ProfileAvatar({
  user,
  isAccounOwner,
  profileHeight = "680px",
  profileWidth = "273px",
  handleClickEditProfileButton,
  handleClickFollowButton,
  handleClickContributions,
  handleClickFollowers,
  handleClickFollowing,
}: ProfileAvatarProps) {
  return (
    <PaperContainer
      sx={{
        height: profileHeight,
        width: profileWidth,
      }}
    >
      <AvatarAndLevels user={user} />
      <NameAndBio {...user} />
      <Divider variant="middle" sx={{ margin: "20px 0 20px 0" }} />
      <ProfileTimeStamp {...user} isAccountOwner={isAccounOwner} />
      <Divider variant="middle" sx={{ margin: "20px 0 5px 0" }} />
      <ContributionAndFollow
        {...user}
        handleClickContributions={handleClickContributions}
        handleClickFollowers={handleClickFollowers}
        handleClickFollowing={handleClickFollowing}
      />
      <Divider variant="middle" sx={{ margin: "5px 0 20px 0" }} />
      <EditOrFollowButton
        isAccountOwner={true}
        handleClickEditProfile={handleClickEditProfileButton}
        handleClickFollow={handleClickFollowButton}
      />
    </PaperContainer>
  );
}
