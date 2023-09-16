import { styled, OutlinedInput, InputLabel } from "@mui/material";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import { ChangePasswordFormInput } from ".";
const StyledPasswordField = styled(OutlinedInput)({
  "&.MuiOutlinedInput-root": {
    "&.Mui-focused > .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
      borderWidth: "2px",
    },
    ":hover:not(&.Mui-focused) > .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.23)",
      borderWidth: "1px",
    },
  },
  "&.MuiFormLabel-root.Mui-focused": {
    color: "rgba(0, 0, 0, 0.6)!important",
    fontStyle: "italic",
  },
});
export type PasswordField =
  | "oldPassword"
  | "newPassword"
  | "confirmNewPassword";

interface PasswordTextFieldProps<T extends PasswordField> {
  id: string;
  label: string;
  controllerField: ControllerRenderProps<ChangePasswordFormInput, T>;
  controllerFieldState: ControllerFieldState;
}
export default function PasswordTextField({
  id,
  label,
  controllerField,
  controllerFieldState,
}: PasswordTextFieldProps<PasswordField>) {
  return (
    <>
      <InputLabel htmlFor={id} error={controllerFieldState.invalid}>
        {label}
      </InputLabel>
      <StyledPasswordField
        type='password'
        label={label}
        id={id}
        onChange={controllerField.onChange}
        error={controllerFieldState.invalid}
        name={controllerField.name}
        ref={controllerField.ref}
        fullWidth
      />
    </>
  );
}
