import React from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Typography } from "@mui/material";

export default function ProfileTimeStamp({ user }) {
  return (
    <section>
      <div>
        <QueryBuilderIcon />
        <Typography>{user.activeTime}</Typography>
      </div>
      <div>
        <CalendarTodayIcon />
        <Typography>{user.createdTime}</Typography>
      </div>
    </section>
  );
}
