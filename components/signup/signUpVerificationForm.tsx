import styles from "./style.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Grid, Link, Typography, FormHelperText } from "@mui/material";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { SignupFormInput, VerificationFormInput } from "./signUpFormInputTypes";
type SignUpVerificationFormProps = {
  email: string;
  isInvalid: boolean;
  signUp: SubmitHandler<VerificationFormInput>;
  setAwaitingVerification: any;
  resend: SubmitHandler<VerificationFormInput>;
};

const StyledLink = styled(Link)({
  "& .MuiLink-root:hover": {
    textDecoration: "decoration",
  },
});
const SignUpVerificationForm = ({
  email,
  signUp,
  isInvalid,
  resend,
  setAwaitingVerification,
}: SignUpVerificationFormProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const { control, handleSubmit } = useForm<VerificationFormInput>({
    defaultValues: {
      otp: "",
    },
  });
  const { field: otp, fieldState: otpState } = useController({
    name: "otp",
    control,
    rules: {
      required: true,
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(`modal is ${open}`);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(signUp)}>
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
              fullWidth
              variant='outlined'
              sx={{
                marginBottom: "1em",
              }}
              inputRef={otp.ref}
              name={otp.name}
              value={otp.value}
              onChange={otp.onChange}
              InputLabelProps={{
                sx: {
                  border: "none",
                },
              }}
            />
            {isInvalid && (
              <FormHelperText
                id='otp-error-message'
                error={isInvalid}
                className={styles.signup_error}
              >
                Invalid code
              </FormHelperText>
            )}
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
              type='submit'
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
                <StyledLink
                  underline='hover'
                  color={"secondary"}
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(signUp);
                  }}
                >
                  Resend it
                </StyledLink>
              </span>
              <span> or </span>
              <span>
                <StyledLink
                  underline='hover'
                  color={"secondary"}
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    setAwaitingVerification(false);
                  }}
                >
                  Use a different email
                </StyledLink>
              </span>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};
SignUpVerificationForm.defaultProps = {
  isInvalid: true,
};
export default SignUpVerificationForm;
