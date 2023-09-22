import {
  styled,
  OutlinedInput,
  InputLabel,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import { ChangePasswordFormInput } from ".";
const StyledPasswordField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused:not(.Mui-error)": {
      "> .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
        borderWidth: "2px",
      },
    },
    ":hover:not(&.Mui-focused) > .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.23)",
      borderWidth: "1px",
    },
    "&.Mui-error > input": {
      borderColor: "red",
    },
    "&.Mui-error > label": {
      color: "red",
    },
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "rgba(0, 0, 0, 0.6)!important",
  },
});
export type PasswordFieldName =
  | "oldPassword"
  | "newPassword"
  | "confirmNewPassword";

type PasswordTextFieldProps<T extends PasswordFieldName> = TextFieldProps & {
  controllerField: ControllerRenderProps<ChangePasswordFormInput, T>;
  controllerFieldState: ControllerFieldState;
};
export default function PasswordTextField({
  controllerField,
  controllerFieldState,
  ...rest
}: PasswordTextFieldProps<PasswordFieldName>) {
  return (
    <StyledPasswordField
      type='password'
      value={controllerField.value}
      onChange={controllerField.onChange}
      error={controllerFieldState.invalid}
      name={controllerField.name}
      inputRef={controllerField.ref}
      {...rest}
    />
  );
}
