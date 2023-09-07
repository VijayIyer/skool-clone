import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import ArrowUp from "@mui/icons-material/KeyboardArrowUp";
import ArrowDown from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";

interface GroupsInfo {
  groupIcon: String; // src of the icon image
  groupName: String;
  groupId: number;
}

export default function GroupSwitch() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [groupList, setGroupList] = useState(null);
  const [currentGroup, setCurrentGroup] = useState<GroupsInfo | null>({groupIcon: "none", groupName: "SKool Community", groupId: 0});

  function toggleOpen() {
    setOpen(!isOpen);
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
    setOpen(!isOpen);
  }

  return (
    <Box sx={{ display: " flex", flexDirection: "row" }}>
      <Box sx={{ display: " flex", flexDirection: "row" }}>
        <Avatar src={currentGroup?.groupIcon} variant="square"/>
        <Typography>{currentGroup?.groupName}</Typography>
      </Box>
      <IconButton onClick={handleClick}>
        {isOpen ? <ArrowDown /> : <ArrowUp />}
      </IconButton>
      <Menu anchorEl={anchorEl} open={isOpen} onClose={toggleOpen}>
        <MenuItem> Switch Groups</MenuItem>
        <Divider />
          {/* { display a list of group button with infomationin groupList } */}
        <Divider />
        <MenuItem onClick={toggleOpen}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>Create a group</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
