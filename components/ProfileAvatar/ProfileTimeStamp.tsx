import React from "react";
import moment from "moment";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CircleIcon from "@mui/icons-material/Circle";

export default function ProfileTimeStamp({ user, isAccounOwner = true }) {
  const activeTime = moment(user.activeTime).fromNow();
  const joinedTime = moment(user.createdTime).format("MMM D,YYYY");

  // const status = (isAccounOwner ? (
  //   <>
  //     <CircleIcon sx={{ color: "rgb(0, 158, 93)" }} />
  //     <Typography>Online now</Typography>
  //   </>
  // ) : (
  //   <>
  //     <QueryBuilderIcon />
  //     <Typography> {activeTime}</Typography>
  //   </>)

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ height: "56px" }}
    >
      <Stack direction="row" spacing={1}>
        {/* {isAccounOwner ? (
          <>
            {" "}
            <CircleIcon sx={{ color: "rgb(0, 158, 93)" }} />
            <Typography>Online now</Typography>
          </>
        ) : (
          <>
            <QueryBuilderIcon />
            <Typography> {activeTime}</Typography>
          </>
        )} */}
        <CircleIcon sx={{ color: "rgb(0, 158, 93)" }} />
        <Typography>Online now</Typography>
        {/* <QueryBuilderIcon />
        <Typography> {activeTime}</Typography> */}
      </Stack>
      <Stack direction="row" spacing={1}>
        <CalendarTodayIcon />
        <Typography>Joined {joinedTime}</Typography>
      </Stack>
    </Box>
  );
}
