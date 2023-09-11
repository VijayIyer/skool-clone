import React, { useState, useEffect } from "react";
import {
  Divider,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

interface ChatMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

export default function ChatMenu(props: ChatMenuProps) {
  const { anchorEl, open, onClose } = props;
  type filterState = "All" | "Unread";
  const [chatFilter, setChatFilter] = useState<filterState>("All");

  function handleFilterChange(event: SelectChangeEvent) {
    setChatFilter(event.target.value as filterState);
  }

  function renderSearchUsers() {
    return (
      <MenuItem>
        <div>
          <SearchIcon />
        </div>
        <TextField
          placeholder="Search Users"
          inputProps={{ "aria-able": "search" }}
        />
      </MenuItem>
    );
  }

  function renderChatFilter() {
    return (
      <Select value={chatFilter} onChange={handleFilterChange}>
        <MenuItem value={"All"}>{"All"}</MenuItem>
        <MenuItem value={"Unread"}> {"Unread"}</MenuItem>
      </Select>
    );
  }

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem>
        <Typography>Chats</Typography>
        {renderChatFilter()}
      </MenuItem>
      <Divider />
      {renderSearchUsers()}
      <Divider />
      <MenuItem>No Chat yet</MenuItem>
    </Menu>
  );
}
