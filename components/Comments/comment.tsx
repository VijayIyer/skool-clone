import React, { useState } from "react";
import Image from "next/image";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  ImageList,
  Typography,
  Button,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentBar from "../CommentBar";

export interface ReplyType {
  id: number;
  text: string;
}

export interface CommentType {
  id: number;
  text: string;
  by?: string;
  numberOfLikes?: number;
  numberOfReplies?: number;
  replies?: Array<ReplyType>; 
}

export interface CommentProps {
  profileImg: string;
  comment: CommentType;
}
export default function Comment({
  profileImg,
  comment,
}: CommentProps): JSX.Element | null {
  const [isReply, setIsReply] = useState<Boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!comment) return null;
  return (
    <>
      <Box
        // move to stylesheet
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1em",
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
          }}
        >
          {/* Image component to show user */}
          <img
            src={""}
            alt='Profile Picture'
            style={{
              maxWidth: "100%",
            }}
          />
        </Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%"
          }}
        >
          <Card
            sx={{
              borderRadius: "10px",
              padding: "8px 13px",
              bgcolor: "rgb(248, 247, 245)"
            }}
          >
            <CardHeader
              sx={{padding: "0px"}}
              action={
                <IconButton onClick={handleClick}>
                  <MoreHorizIcon />
                </IconButton>
              }
              title={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* user name goes here */}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      marginRight: "2px",
                    }}
                  >
                    User Name
                  </Typography>
                  {/* no of hours/days ago goes here */}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "grey",
                    }}
                  >
                    &#x2022; 1h ago
                  </Typography>
                </Box>
              }
            ></CardHeader>

            <CardContent sx={{padding: "0px"}}>
              <Typography
                sx={{
                  fontSize: "16px",
                }}
                component={"p"}
                gutterBottom
              >
                {comment.text}
              </Typography>
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              verticalAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton>
                <ThumbUpOutlinedIcon />
              </IconButton>
              <Typography
                component={"div"}
                sx={{
                  color: "grey",
                }}
              >
                {/* {comment.numberOfLikes} */}0
              </Typography>
            </Box>

            <Button
              sx={{
                color: "grey",
                textTransform: "none", // to remove capitalization
              }}
              onClick={()=>setIsReply(true)}
            >
              Reply
            </Button>
          </Box>
          {isReply ? (
            <Stack spacing={2} sx={{mt: 2}}>
              <CommentBar/>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
              >
                <Button size="large" variant="text" onClick={() => setIsReply(false)}>Cancel</Button>
                <Button size="large" variant="contained">Reply</Button>
              </Stack>
            </Stack>
          ) : null}
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Copy link</MenuItem>
        <MenuItem onClick={handleClose}>Report to admins</MenuItem>
      </Menu>
    </>
  );
}
