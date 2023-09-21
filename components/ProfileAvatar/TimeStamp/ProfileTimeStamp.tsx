import React from "react";
import moment from "moment";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import StatusDisplay from "./StatusDisplay";

interface ProfileTimeStampProps {
  activeTime: string;
  createdTime: string;
  isAccountOwner: boolean;
}

export default function ProfileTimeStamp({
  activeTime,
  createdTime,
  isAccountOwner = true,
}: ProfileTimeStampProps) {
  const activeTimeFromNow = moment(activeTime).fromNow();
  const joinedTime = moment(createdTime).format("MMM D,YYYY");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ height: "56px" }}
    >
      {/* <Stack direction="row" spacing={1}>
        {isAccounOwner ? (
          <>
            <CircleIcon sx={{ color: "rgb(0, 158, 93)" }} />
            <Typography>Online now</Typography>
          </>
        ) : (
          <>
            <QueryBuilder />
            <Typography> {activeTime}</Typography>
          </>
        )}
      </Stack> */}
      <StatusDisplay
        isAccountOwner={isAccountOwner}
        activeTime={activeTimeFromNow}
      />
      <Stack direction="row" spacing={1}>
        <CalendarTodayIcon />
        <Typography>Joined {joinedTime}</Typography>
      </Stack>
    </Box>
  );
}
