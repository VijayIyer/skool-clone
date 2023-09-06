import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ArrowUp from "@mui/icons-material/KeyboardArrowUp";
import ArrowDown from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";

export default function GroupSwitch() {
  const [isOpen, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!isOpen);
  }

  return (
    <Box sx={{ display: " flex", flexDirection: "row" }}>
      <Typography>Community</Typography>
      <IconButton onClick={toggleOpen}>
        {isOpen ? <ArrowDown /> : <ArrowUp />}
      </IconButton>
      <Dialog open={isOpen} onClose={toggleOpen}>
        <DialogTitle> Switch Groups</DialogTitle>
        <ListItem>
          <ListItemButton onClick={toggleOpen}>
            <AddIcon />
            <ListItemText primary="Create a Groups" />
          </ListItemButton>
        </ListItem>
      </Dialog>
    </Box>
  );
}
