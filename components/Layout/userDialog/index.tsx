import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
interface UserDialogProps {
    //implement use information later
  open: boolean;
  onClose: () => void;
}

export default function UserDialog(props: UserDialogProps) {
  const { open, onClose } = props;

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
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{"useremail@google.com"}</DialogTitle>
        <List>
          <ListItem>
            <ListItemButton href="profile">profile</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton href="settings">Settings</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={openLogOut}>Log out</ListItemButton>
          </ListItem>
        </List>
      </Dialog>

      {renderLogOut()}
    </>
  );
}
