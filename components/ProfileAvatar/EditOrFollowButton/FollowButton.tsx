import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function FollowButton({
  handleClickFollow,
}: {
  handleClickFollow: () => void;
}) {
  return (
    <Button
      onClick={handleClickFollow}
      sx={{ width: "100%", height: "46px" }}
      variant="contained"
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
        FOLLOW
      </Typography>
    </Button>
  );
}
