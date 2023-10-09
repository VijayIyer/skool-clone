//this is a page to render component during development. Remove in production environment
import React from "react";
import ProfileAvatar from "@/components/ProfileAvatar";
import { fakeUser } from "@/components/ProfileAvatar/fakeApi";

export default function componentRender() {
  return (
    <div>
      <ProfileAvatar
        user={fakeUser}
        isAccounOwner={true}
        handleClickEditProfileButton={() => {}}
        handleClickFollowButton={() => {}}
        handleClickContributions={() => {}}
        handleClickFollowers={() => {}}
        handleClickFollowing={() => {}}
      />
    </div>
  );
}
