import React from "react";
import EditButton from "./EditButton";
import FollowButton from "./FollowButton";

export default function ButtonContainer({
  isAccountOwner,
  handleClickEditProfile,
  handleClickFollow,
}) {
  // console.log("account owner: ", isAccountOwner);

  if (isAccountOwner) {
    return (
      <div>
        <EditButton onClick={handleClickEditProfile} />
      </div>
    );
  }

  return (
    <div>
      <FollowButton onClick={handleClickFollow} />
    </div>
  );
}
