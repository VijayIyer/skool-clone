import React, { useMemo } from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Typography } from "@mui/material";
import moment from "moment";

export default function ProfileTimeStamp({ user }) {
  const activeTime = moment(user.activeTime).fromNow();
  const joinedTime = moment(user.createdTime).format("MMM D,YYYY");

  return (
    <section>
      <div>
        <QueryBuilderIcon />
        <Typography>{activeTime}</Typography>
      </div>
      <div>
        <CalendarTodayIcon />
        <Typography>Joined {joinedTime}</Typography>
      </div>
    </section>
  );
}
