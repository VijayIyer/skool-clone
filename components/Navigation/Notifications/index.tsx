import React, { useState, useEffect } from "react";

import {
    Divider,
    Menu,
    MenuItem,
    Typography,
    Select,
    SelectChangeEvent,
    MenuList
  } from "@mui/material";

  interface NotificationMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
  }

  export default function NotificationMenu( props: NotificationMenuProps) {
    const { anchorEl, open, onClose} = props;

    const [currentGroup, setCurrentGroup] = useState<string>("All")
    function handleGroupChange(event: SelectChangeEvent) {
        setCurrentGroup(event.target.value as string);
    }

    function renderGroupFilter() {
        return (
            <Select value={currentGroup} onChange={handleGroupChange}>
                <MenuItem value={"All"}>{"All Group"}</MenuItem>
            </Select>
        )
    }
    
    return (
        <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
            <MenuItem>
                <Typography>
                    Notifications
                </Typography>
                {renderGroupFilter()}
            </MenuItem>
            <Divider/>
            <MenuList>
                <MenuItem>
                    new notification
                </MenuItem>
            </MenuList>
        </Menu>
    )
  }