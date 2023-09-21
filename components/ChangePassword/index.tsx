import styles from "./style.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
  styled,
} from "@mui/material";
import ChangePasswordButton from "./ChangePasswordButton";
import PasswordTextField, { PasswordField } from "./PasswordTextField";

export interface ChangePasswordFormInput {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePasswordForm() {
  const {
    control,
    handleSubmit,
    setFocus,
    setError,
    reset,
    clearErrors,
    formState,
    formState: { isSubmitSuccessful, isDirty },
  } = useForm<ChangePasswordFormInput>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit: SubmitHandler<ChangePasswordFormInput> = async (data, e) => {
    e?.preventDefault();
    let response;
    try {
      response = await fetch("/api/auth/change-password", {
        method: "PUT",
        mode: "same-origin",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer token`,
        },
        body: JSON.stringify(data),
      });
    } catch (err: any) {
      console.log(JSON.stringify(err));
      setError("oldPassword", { type: "manual", message: err?.message });
    } finally {
      if (response?.ok === true) {
        console.log(`resetting all password fields`);
        reset({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else if (response?.status === 401) {
        console.log(JSON.stringify(response));
        setError("oldPassword", {
          type: "manual",
          message: "Password does not match",
        });
      }
    }
  };
  // Adds query parameter when user selects tab to get to Change Password form
  const router = useRouter();
  useEffect(() => {
    router.query.t = "password";
    router.push(router);
  }, [router.isReady]);

  const { field: newPassword, fieldState: newPasswordState } = useController<
    ChangePasswordFormInput,
    PasswordField
  >({
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
  const { field: oldPassword, fieldState: oldPasswordState } = useController<
    ChangePasswordFormInput,
    PasswordField
  >({
    name: "oldPassword",
    control,
    rules: {
      required: true,
    },
  });
  const { field: confirmNewPassword, fieldState: confirmNewPasswordState } =
    useController<ChangePasswordFormInput, PasswordField>({
      name: "confirmNewPassword",
      control,
      rules: {
        required: true,
      },
    });

  return (
    <Paper className={styles.changePasswordContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.header}>Change password</p>

        <div className={styles.passwordFieldsContainer}>
          <div>
            <FormControl variant='outlined' fullWidth>
              <PasswordTextField
                id='old_password'
                fullWidth
                variant='outlined'
                label='Old password'
                controllerField={oldPassword}
                controllerFieldState={oldPasswordState}
                focus={true}
              />
            </FormControl>
            {oldPasswordState.error && (
              <FormHelperText id='old-password-error-message' variant='filled'>
                {oldPasswordState.error?.message}
              </FormHelperText>
            )}
          </div>
          <div>
            <FormControl variant='outlined' fullWidth>
              <PasswordTextField
                id='new_password'
                label='New password'
                controllerField={newPassword}
                controllerFieldState={newPasswordState}
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
              <PasswordTextField
                id='confirm_new_password'
                label='Confirm new password'
                controllerField={confirmNewPassword}
                controllerFieldState={confirmNewPasswordState}
              />
            </FormControl>
          </div>
        </div>

        <div>
          <ChangePasswordButton
            disabled={
              newPassword.value === "" ||
              oldPassword.value === "" ||
              confirmNewPassword.value === "" ||
              newPassword.value !== confirmNewPassword.value
            }
          />
        </div>
      </form>
    </Paper>
  );
}
