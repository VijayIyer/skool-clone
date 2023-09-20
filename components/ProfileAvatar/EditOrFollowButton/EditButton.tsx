import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledEditButton = styled(Button)({
  width: "100%",
  height: "46px",
  border: "1px solid rgb(228, 228, 228)",
  color: "rgb(144, 144, 144)",
  "&:hover": { color: "black" },
});

export default function EditButton() {
  return (
    <StyledEditButton>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        EDIT PROFILE
      </Typography>
    </StyledEditButton>
  );
}
