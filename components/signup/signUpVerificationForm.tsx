import styles from "./style.module.css";
import { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DialogContent, styled } from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Grid, Link, Typography, FormHelperText } from "@mui/material";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { VerificationFormInput } from "./signUpFormInputTypes";
import TimedAlertBox from "../common/TimedAlert/TimedAlert";
import CommonLink from "../common/TimedAlert/Link";
type SignUpVerificationFormProps = {
  email: string;
  isInvalid: boolean;
  signUp: SubmitHandler<VerificationFormInput>;
  setAwaitingVerification: Dispatch<SetStateAction<boolean>>;
  resend: () => Promise<boolean>;
};

const SignUpVerificationForm = ({
  email,
  signUp,
  isInvalid,
  resend,
  setAwaitingVerification,
}: SignUpVerificationFormProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<VerificationFormInput>({
    defaultValues: {
      otp: "",
    },
  });
  const renderEmailResentAlert = () => {
    setShowAlert(true);
    // this timeout needs to be cleared to prevent memory leakage
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const { field: otp, fieldState: otpState } = useController({
    name: "otp",
    control,
    rules: {
      required: true,
    },
  });
  const handleClickOpen = () => {};
  // closing or opening of otp verification dialog not controlled by user action
  const handleClose = () => {};
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            overflowY: "hidden",
          }}
        >
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
                  error={otpState.invalid}
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
                {(isInvalid || otpState.invalid) && !otpState.isDirty && (
                  <FormHelperText
                    id='otp-error-message'
                    error={(isInvalid || otpState.invalid) && !otpState.isDirty}
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
                    <CommonLink
                      text={"Resend it"}
                      onClick={async (e) => {
                        e.preventDefault();
                        if (await resend()) renderEmailResentAlert();
                      }}
                    />
                  </span>
                  <span> or </span>
                  <span>
                    <CommonLink
                      text={`Use a different email`}
                      onClick={(e) => {
                        e.preventDefault();
                        setAwaitingVerification(false);
                      }}
                    />
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      {
        <TimedAlertBox
          sx={{
            backgroundColor: "black",
            color: "white",
            fontSize: "large",
            borderRadius: "10px",
            overflow: "hidden",
            width: "fit-content",
            padding: "1em",
            zIndex: "1",
            margin: "1em",
            position: "absolute",
            left: 0,
            bottom: 0,
          }}
          message={"Email resent"}
          alertVisibility={showAlert}
          setAlertVisibility={setShowAlert}
        />
      }
    </>
  );
};
SignUpVerificationForm.defaultProps = {
  isInvalid: true,
};
export default SignUpVerificationForm;
