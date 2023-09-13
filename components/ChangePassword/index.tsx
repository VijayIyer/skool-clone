import styles from "./style.module.css";
import { useController, useForm, SubmitHandler } from "react-hook-form";
import {
  Typography,
  FormHelperText,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

interface ChangePasswordFormInput {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePasswordForm() {
  const { control, handleSubmit } = useForm<ChangePasswordFormInput>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit: SubmitHandler<ChangePasswordFormInput> = (data, e) => {
    // e?.preventDefault();
    console.log(data);
  };

  const { field: newPassword, fieldState: newPasswordState } = useController({
    name: "newPassword",
    control,
    rules: {
      required: true,
      minLength: {
        value: 5,
        message: `Password must be atleast 5 characters`,
      },
      maxLength: {
        value: 72,
        message: `Password can be up to 72 characters`,
      },
    },
  });
  const { field: oldPassword, fieldState: oldPasswordState } = useController({
    name: "oldPassword",
    control,
    rules: {
      required: true,
    },
  });
  const { field: confirmNewPassword, fieldState: confirmNewPasswordState } =
    useController({
      name: "confirmNewPassword",
      control,
      rules: {
        required: true,
      },
    });

  return (
    <Paper className={styles.changePasswordContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.headerContainer}>
          <Typography variant='type2' component={"p"} className={styles.header}>
            Change password
          </Typography>
        </div>
        <div className={styles.passwordFieldsContainer}>
          <div>
            <FormControl variant='outlined' fullWidth>
              <InputLabel
                htmlFor='old_password'
                error={oldPasswordState.invalid}
              >
                Old password
              </InputLabel>
              <OutlinedInput
                id='old_password'
                data-testid='old-password-component'
                onChange={oldPassword.onChange}
                name={oldPassword.name}
                inputRef={oldPassword.ref}
                error={oldPasswordState.invalid}
                inputProps={{
                  "aria-errormessage": "old-password-error-message",
                }}
                label='Old password'
                fullWidth
                autoFocus
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant='outlined' fullWidth>
              <InputLabel
                htmlFor='new_password'
                error={newPasswordState.invalid}
              >
                New password
              </InputLabel>
              <OutlinedInput
                id='new_password'
                data-testid='new-password-component'
                onChange={newPassword.onChange}
                name={newPassword.name}
                inputRef={newPassword.ref}
                error={newPasswordState.invalid}
                inputProps={{
                  "aria-errormessage": "new-password-error-message",
                }}
                label='New password'
                fullWidth
              />
            </FormControl>
          </div>
          {newPasswordState.error && (
            <FormHelperText id='new-password-error-message' variant='filled'>
              {newPasswordState.error?.message}
            </FormHelperText>
          )}
          <div>
            <FormControl variant='outlined' fullWidth>
              <InputLabel
                htmlFor='confirm_new_password'
                error={confirmNewPasswordState.invalid}
              >
                Confirm new password
              </InputLabel>
              <OutlinedInput
                id='confirm_new_password'
                data-testid='confirm-password-component'
                onChange={confirmNewPassword.onChange}
                name={confirmNewPassword.name}
                inputRef={confirmNewPassword.ref}
                error={confirmNewPasswordState.invalid}
                inputProps={{
                  "aria-errormessage": "confirm-new-password-error-message",
                }}
                label='Confirm new password'
                fullWidth
              />
            </FormControl>
          </div>
        </div>

        <div>
          <Button
            variant='contained'
            type='submit'
            className={styles.changePasswordButton}
            disabled={
              newPassword.value === "" ||
              oldPassword.value === "" ||
              confirmNewPassword.value === "" ||
              newPassword.value !== confirmNewPassword.value
            }
          >
            <span className={styles.changePasswordButtonLabel}>
              <Typography
                variant='p'
                component='p'
                sx={{
                  fontSize: "1em",
                }}
                fontSize={"large"}
              >
                Change Password
              </Typography>
            </span>
          </Button>
        </div>
      </form>
    </Paper>
  );
}
