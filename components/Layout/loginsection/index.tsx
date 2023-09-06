import React, { useState } from "react";
import { Box, Button, Dialog, Stack, DialogTitle } from "@mui/material";
import LogInDialog from "@/components/login";

export default function LoginSignUpBar() {
  const [isLogInOpen, setLogInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  function toggleLogIn() {
    setLogInOpen(!isLogInOpen);
    setSignUpOpen(false);
  }

  function toggleSignUp() {
    setSignUpOpen(!isSignUpOpen);
    setLogInOpen(false);
  }

  function renderLogInDialog() {
    return (
      <LogInDialog open={isLogInOpen} onClose={toggleLogIn} />
    )
  }

  function renderSignUpDialog() {
    return (
      <Dialog open={isSignUpOpen} onClose={toggleSignUp}>
        <DialogTitle>
          import Sign Up components
        </DialogTitle>
      </Dialog>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row' }} >
        <Button variant="outlined" color='secondary' onClick={toggleLogIn}> LOG IN </Button>
        <Button variant='outlined' color="secondary" onClick={toggleSignUp}> SIGN UP </Button>
      </Box>
      {renderLogInDialog()}
      {renderSignUpDialog()}
    </>
  );
}
