import React, { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationIcon from "@mui/icons-material/NotificationsNone";
import AccontCircle from "@mui/icons-material/AccountCircleOutlined";
import UserDialog from "../userDialog";
import {
  Box,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export default function UserSection() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  const [newChatNumber, setNewChatNumber] = useState(5);
  const [newNotificationNumber, setNotificationNumber] = useState(6);

  function openChatDialog() {
    setNewChatNumber(0);
    setChatOpen(true);
  }
  function closeChatDialog() {
    setChatOpen(false);
  }

  function openNotificationDialog() {
    setNotificationNumber(0);
    setNotificationOpen(true);
  }

  function closeNotificationDialog() {
    setNotificationOpen(false);
  }

  function openUserDialog() {
    setUserOpen(true);
  }

  function closeUserDialog() {
    setUserOpen(false);
  }

  function renderChatDialog() {
    return (
      <Dialog open={isChatOpen} onClose={closeChatDialog}>
        <DialogTitle>Will implement Chat system later.</DialogTitle>
      </Dialog>
    );
  }

  function renderNotificationDialog() {
    return (
      <Dialog open={isNotificationOpen} onClose={closeNotificationDialog}>
        <DialogTitle>Notifications</DialogTitle>
      </Dialog>
    );
  }

  function renderUserDialog() {
    return (
      <UserDialog open = {isUserOpen} onClose={closeUserDialog}/>
    );
  }

  return (
    <>
      <Box>
        <IconButton onClick={openChatDialog}>
          <Badge badgeContent={newChatNumber} color="error">
            <ChatIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={openNotificationDialog}>
          <Badge badgeContent={newNotificationNumber} color="error">
            <NotificationIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={openUserDialog}>
          <Badge>
            <AccontCircle />
          </Badge>
        </IconButton>
      </Box>

      {renderChatDialog()}
      {renderNotificationDialog()}
      {renderUserDialog()}
    </>
  );
}
