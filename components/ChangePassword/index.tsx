import styles from "./style.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useController, useForm, SubmitHandler } from "react-hook-form";
import { FormHelperText, Paper } from "@mui/material";
import TimedAlert from "../common/TimedAlert/TimedAlert";
import ChangePasswordButton from "./ChangePasswordButton";
import PasswordTextField, { PasswordFieldName } from "./PasswordTextField";

export type ChangePasswordFormInput = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
type ChangePasswordFormProps = {
  onSubmissionSucessAlert: () => void;
};
export default function ChangePasswordForm({
  onSubmissionSucessAlert,
}: ChangePasswordFormProps) {
  const [showAlert, setShowAlert] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    reset,

    formState: { isSubmitSuccessful, isDirty, isSubmitted },
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
        },
        body: JSON.stringify(data),
      });
    } catch (err: any) {
      setError("oldPassword", { type: "manual", message: err?.message });
    } finally {
      const data: {
        success?: boolean;
        errorMessage?: string;
        data?: string;
      } = await response?.json();
      if (response?.ok === true) {
      } else if (response?.status === 401) {
        setError("oldPassword", {
          type: "manual",
          message: data.errorMessage,
        });
      }
    }
  };
  // Adds query parameter when user selects tab to get to Change Password form
  const router = useRouter();
  useEffect(() => {
    router.query.t = "password";
    router.push(router);
  }, [router.isReady]); // adding router as dependency creates infinite calling of useEffect
  useEffect(() => {
    // let timer: ReturnType<typeof setTimeout>;
    if (isSubmitSuccessful) {
      onSubmissionSucessAlert();
      reset({});
    }
    // return () => clearTimeout(timer);
  }, [isSubmitSuccessful]);

  const { field: newPassword, fieldState: newPasswordState } = useController<
    ChangePasswordFormInput,
    PasswordFieldName
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
    PasswordFieldName
  >({
    name: "oldPassword",
    control,
    rules: {
      required: true,
    },
  });
  const { field: confirmNewPassword, fieldState: confirmNewPasswordState } =
    useController<ChangePasswordFormInput, PasswordFieldName>({
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
            <PasswordTextField
              id='old_password'
              label='Old password'
              fullWidth
              autoFocus
              variant='outlined'
              controllerField={oldPassword}
              controllerFieldState={oldPasswordState}
            />

            {oldPasswordState.error && (
              <FormHelperText id='old-password-error-message' variant='filled'>
                {oldPasswordState.error?.message}
              </FormHelperText>
            )}
          </div>
          <div>
            <PasswordTextField
              id='new_password'
              label='New password'
              helperText={
                newPasswordState.error ? newPasswordState.error?.message : ""
              }
              fullWidth
              variant='outlined'
              controllerField={newPassword}
              controllerFieldState={newPasswordState}
            />
          </div>

          <div>
            <PasswordTextField
              id='confirm_new_password'
              label='Confirm new password'
              variant='outlined'
              controllerField={confirmNewPassword}
              controllerFieldState={confirmNewPasswordState}
              fullWidth
            />
          </div>
        </div>

        <div>
          <ChangePasswordButton
            type='submit'
            data-testid='change-password-btn'
            name='change-password-btn'
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
ChangePasswordForm.defaultProps = {
  onSubmissionSucessAlert: () => {},
};
