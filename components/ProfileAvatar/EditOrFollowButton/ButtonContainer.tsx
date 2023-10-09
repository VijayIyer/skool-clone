import React from "react";
import EditButton from "./EditButton";
import FollowButton from "./FollowButton";

interface ButtonContainerProps {
  isAccountOwner: boolean;
  handleClickEditProfile: () => void;
  handleClickFollow: () => void;
}

export default function ButtonContainer({
  isAccountOwner,
  handleClickEditProfile,
  handleClickFollow,
}: ButtonContainerProps) {
  if (isAccountOwner) {
    return (
      <div>
        <EditButton handleClickEditProfile={handleClickEditProfile} />
      </div>
    );
  }

  return (
    <div>
      <FollowButton handleClickFollow={handleClickFollow} />
    </div>
  );
}
