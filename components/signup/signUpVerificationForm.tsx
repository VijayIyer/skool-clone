import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Link, Typography } from "@mui/material";
type SignUpVerificationFormProps = {
  email: string;
};

const SignUpVerificationForm = ({ email }: SignUpVerificationFormProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        borderRadius: "2em",
      }}
    >
      <form>
        <Grid
          container
          flexDirection={"column"}
          sx={{
            padding: "2em",
            boxShadow: "none",
          }}
        >
          <Grid item textAlign={"center"}>
            <Typography
              variant='h2'
              component={"h2"}
              sx={{
                margin: "0 0 8px",
                fontSize: "23px",
                fontWeight: "bold",
              }}
            >
              We sent you a code
            </Typography>
          </Grid>
          <Grid item textAlign={"center"}>
            <Typography
              component='p'
              variant='subtitle1'
              sx={{ margin: "0 0 32px" }}
            >
              Enter it below to verify {email}
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              id='otp'
              label='Verification code'
              type='email'
              fullWidth
              variant='outlined'
              sx={{
                marginBottom: "1em",
              }}
              InputLabelProps={{
                sx: {
                  border: "none",
                },
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              fullWidth
              sx={{
                height: "3em",
                marginBottom: "1em 1em",
                borderRadius: "4px",
              }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                margin: "1em 0",
              }}
            >
              Didn&#39;t get the email?{" "}
              <span>
                <Link underline='none' color={"secondary"}>
                  Resend
                </Link>
              </span>
              <span> </span>
              it or{" "}
              <span>
                <Link underline='none' color={"secondary"}>
                  Use a different email
                </Link>
              </span>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
export default SignUpVerificationForm;
