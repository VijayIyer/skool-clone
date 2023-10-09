import React from "react";

import Typography from "@mui/material/Typography";

interface NameAndBioProps {
  fullName: string;
  url: string;
  bio: string;
}

export default function NameAndBio({ fullName, url, bio }: NameAndBioProps) {
  return (
    <section>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {fullName}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontWeight: "bold",
          fontSize: "14px",
          lineHeight: 1.5,
        }}
      >
        {url}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {bio}
      </Typography>
    </section>
  );
}
