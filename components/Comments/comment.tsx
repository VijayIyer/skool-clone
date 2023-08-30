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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export interface CommentType {
  id: number;
  text: string;
  by: string;
  numberOfLikes: number;
  numberOfReplies: number;
}

export interface CommentProps {
  profileImg: string;
  comment: CommentType;
}
export default function Comment({
  profileImg,
  comment,
}: CommentProps): JSX.Element | null {
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
          }}
        >
          <Card
            sx={{
              borderRadius: "10px",
              width: "20em",
            }}
          >
            <CardHeader
              action={
                <IconButton>
                  <MoreHorizIcon onClick={handleClick} />
                </IconButton>
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                }}
              ></Box>
            </CardHeader>

            <CardContent>
              <Typography component={"p"} gutterBottom>
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
              }}
            >
              Reply
            </Button>
          </Box>
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
