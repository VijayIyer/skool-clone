import React from "react";
import Typography from "@mui/material/Typography";
import { StyledEditButton } from "../StyledComponents";

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
