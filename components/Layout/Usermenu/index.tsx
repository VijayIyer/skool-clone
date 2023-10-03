import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Link,
} from "@mui/material";
interface UserMenuProps {
  //implement use information later
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function UserMenu(props: UserMenuProps) {
  const { open, anchorEl, onClose } = props;

  const [isLogOutOpen, setLogOutOpen] = useState(false);

  function openLogOut() {
    onClose();
    setLogOutOpen(true);
  }

  function closLogOut() {
    setLogOutOpen(false);
  }

  function handleLogOut() {
    //sign out
    setLogOutOpen(false);
  }

  function renderLogOut() {
    return (
      <Dialog open={isLogOutOpen} onClose={closLogOut}>
        <DialogTitle> Log Out </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closLogOut}> CANCEL </Button>
          <Button> LOG OUT </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <>
      <Menu open={open} anchorEl={anchorEl} onClose={onClose}>
        <MenuItem>{"useremail@google.com"}</MenuItem>
        <Divider />
        <MenuItem>
          <Link href="profile" underline="none" color="inherit">Profile</Link>
        </MenuItem>
        <MenuItem>
          <Link href="setting" underline="none" color="inherit">Setting</Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={openLogOut}>Log Out</MenuItem>
      </Menu>
      {renderLogOut()}
    </>
  );
}
