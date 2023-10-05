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
import AddBoxIcon from "@mui/icons-material/AddBox";
import style from "./group.module.css";

interface GroupsInfo {
  groupIcon: string; // src of the icon image
  groupName: string;
  groupId: number;
}

export default function GroupSwitch() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [groupList, setGroupList] = useState(null);
  const [currentGroup, setCurrentGroup] = useState<GroupsInfo | null>({
    groupIcon: "none",
    groupName: "Skool Community",
    groupId: 0,
  });

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

  function renderGroupList() {}

  function createGroup() {
    toggleOpen();
  }

  return (
    <Box className={`${style.navbar_groupswitcher}`}>
      <Box
        component="a"
        href="/community"
        className={`${style.navbar_groupswitcher_community}`}
      >
        <div className={`${style.navbar_groupswitcher_childwrapper}`}>
          <Avatar
            src={currentGroup?.groupIcon}
            variant="square"
            className={`${style.navbar_groupswitcher_avatar}`}
          />
        </div>
        <div className={`${style.navbar_groupswitcher_childwrapper}`}>
          <Typography className={`${style.navbar_groupswitcher_typography}`}>
            {currentGroup?.groupName}
          </Typography>
        </div>
      </Box>
      <IconButton
        title="Switch groups"
        onClick={handleClick}
        className={`${style.navbar_groupswitcher_switch}`}
      >
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={toggleOpen}
        // className={`${style.navbar_groupswitcher_menu}`}
      >
        <MenuItem>
          <Typography sx={{fontWeight: "bold"}}>Switch Groups</Typography>
        </MenuItem>
        <Divider />
        {/* { display a list of group button with infomationin groupList } */}

        <Divider />
        <MenuItem onClick={toggleOpen} className={`${style.navbar_groupswitcher_item}`}>
          <ListItemIcon >
            <AddBoxIcon className={`${style.groupswitch_addicon}`}/>
          </ListItemIcon>
          <ListItemText>Create a group</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
