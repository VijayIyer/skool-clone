import React, { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationIcon from "@mui/icons-material/NotificationsNone";
import AccontCircle from "@mui/icons-material/AccountCircleOutlined";
import UserMenu from "../Usermenu";
import ChatMenu from "../Chats";
import NotificationMenu from "../Notifications";
import {
  Box,
  Badge,
  IconButton,
} from "@mui/material";

export default function UserSection() {
  const [isChatOpen, setChatOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  const [newChatNumber, setNewChatNumber] = useState(5);
  const [newNotificationNumber, setNotificationNumber] = useState(6);
  const [userMenuAnchor, setUserMenuAnchor] = useState< null | HTMLElement>(null);
  const [chatMenuAnchor, setChatMenuAnchor] = useState< null | HTMLElement>(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState< null | HTMLElement>(null);



  function openChatMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setNewChatNumber(0);
    setChatMenuAnchor(event.currentTarget);
    setChatOpen(true);
  }
  function closeChatMenu() {
    setChatOpen(false);
    setChatMenuAnchor(null);
  }

  function openNotificationMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setNotificationNumber(0);
    setNotificationMenuAnchor(event.currentTarget);
    setNotificationOpen(true);
  }

  function closeNotificationMenu() {
    setNotificationOpen(false);
    setNotificationMenuAnchor(null);
  }

  function openUserMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setUserMenuAnchor(event.currentTarget)
    setUserOpen(true);
  }

  function closeUserMenu() {
    setUserOpen(false);
    setUserMenuAnchor(null);
  }

  function renderChatMenu() {
    return (
      <ChatMenu anchorEl={chatMenuAnchor} open={isChatOpen} onClose={closeChatMenu}/>
    );
  }

  function renderNotificationMenu() {
    return (
      <NotificationMenu anchorEl={notificationMenuAnchor} open={isNotificationOpen} onClose={closeNotificationMenu}/>
    );
  }

  function renderUserMenu() {
    return (
      <UserMenu open = {isUserOpen} anchorEl={userMenuAnchor} onClose={closeUserMenu}/>
    );
  }

  return (
    <>
      <Box>
        <IconButton onClick={(e)=>openChatMenu(e)}>
          <Badge badgeContent={newChatNumber} color="error">
            <ChatIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={(e)=>openNotificationMenu(e)}>
          <Badge badgeContent={newNotificationNumber} color="error">
            <NotificationIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={(e)=>openUserMenu(e)}>
          <Badge>
            <AccontCircle />
          </Badge>
        </IconButton>
      </Box>

      {renderChatMenu()}
      {renderNotificationMenu()}
      {renderUserMenu()}
    </>
  );
}
