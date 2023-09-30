import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";
import { Dispatch, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Link, Typography } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { SignupFormInput } from ".";
type SignUpVerificationFormProps = {
  email: string;
  verify: SubmitHandler<SignupFormInput>;
  setAwaitingVerification: any;
  resend: any;
};
const StyledLink = styled(Link)({
  "& .MuiLink-root:hover": {
    textDecoration: "decoration",
  },
});
const SignUpVerificationForm = ({
  email,
  verify,
  resend,
  setAwaitingVerification,
}: SignUpVerificationFormProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(`modal is ${open}`);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form>
        <Grid
          container
          flexDirection={"column"}
          sx={{
            padding: "2em",
            boxShadow: "none",
            borderRadius: "10px",
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
              onClick={(e) => {
                e.preventDefault();
                setAwaitingVerification(false);
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
                <Link
                  underline='hover'
                  color={"secondary"}
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    resend();
                  }}
                >
                  Resend it
                </Link>
              </span>
              <span> </span>
              <span>or </span>
              <span>
                <Link
                  underline='hover'
                  color={"secondary"}
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    setAwaitingVerification(false);
                  }}
                >
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
