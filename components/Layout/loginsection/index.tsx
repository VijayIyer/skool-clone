import React, { useState } from "react";
import { Box, Button, Dialog, Stack, DialogTitle, Typography } from "@mui/material";
import LogInDialog from "@/components/login";
import style from "@/styles/Navbar.module.css";
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
    return <LogInDialog open={isLogInOpen} onClose={toggleLogIn} />;
  }

  function renderSignUpDialog() {
    return (
      <Dialog open={isSignUpOpen} onClose={toggleSignUp}>
        <DialogTitle>import Sign Up components</DialogTitle>
      </Dialog>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "flex-end", gap: "16px" }}>
        <Button
          variant="outlined"
          onClick={toggleLogIn}
          className={`${style.navbar_btn}`}
        >
          <Typography>
            LOG IN
          </Typography>
        </Button>
        <Button
          variant="outlined"
          onClick={toggleSignUp}
          className={`${style.navbar_btn}`}
        >
          <Typography>
            SIGN UP
          </Typography>
        </Button>
      </Box>
      {renderLogInDialog()}
      {renderSignUpDialog()}
    </>
  );
}
