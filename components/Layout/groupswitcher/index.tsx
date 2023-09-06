import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import ArrowUp from "@mui/icons-material/KeyboardArrowUp";
import ArrowDown from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";

export default function GroupSwitch() {
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function toggleOpen() {
    setOpen(!isOpen);
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
    console.log(anchorEl);
    setOpen(!isOpen);
  }

  return (
    <Box sx={{ display: " flex", flexDirection: "row" }}>
      <Typography>Community</Typography>
      <IconButton onClick={handleClick}>
        {isOpen ? <ArrowDown /> : <ArrowUp />}
      </IconButton>
      <Menu anchorEl={anchorEl} open={isOpen} onClose={toggleOpen}>
        <MenuItem> Switch Groups</MenuItem>
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
