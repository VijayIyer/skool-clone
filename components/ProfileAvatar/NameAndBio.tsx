import React from "react";

import Typography from "@mui/material/Typography";

export default function NameAndBio({ user }) {
  return (
    <section>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "23px",
        }}
      >
        {user.fullName}
      </Typography>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        sx={{
          color: "rgb(144, 144, 144)",
          fontWeight: "bold",
          fontStyle: "normal",
          fontSize: "14px",
          lineHeight: 1.5,
        }}
      >
        {user.url}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.bio}
      </Typography>
    </section>
  );
}
