import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Link,
} from "@mui/material";

interface LogInDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LogInDialog(props: LogInDialogProps) {
  const { open, onClose } = props;
  const [ isOpen, setOpen ] = useState(open);
  const [ email, setEmail ] = useState(null);
  const [ password, setPassword] = useState(null);


  function handleSubmit () {

  }

  function openSignUpDialog () {

  }

  return (
    <Dialog open>
      <Typography>
        <Link href="/">logo</Link>
      </Typography>
      <DialogTitle>Log in to Skool Clone</DialogTitle>
      <FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="password"
          id="password"
          label="Password"
          name="password"
          autoComplete="password"
        />
        {/* <Link onClick ></Link> */}

        <Button type="submit" fullWidth variant="contained">
          LOG IN
        </Button>
      </FormControl>

      <Typography>
        <span>{"Don't have an accoutn ?"}</span>
        <Button>
          <span>Sign up for free</span>
        </Button>
      </Typography>
    </Dialog>
  );
}
