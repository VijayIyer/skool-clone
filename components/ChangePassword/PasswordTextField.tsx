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
    "&.Mui-focused > .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
      borderWidth: "2px",
    },
    ":hover:not(&.Mui-focused) > .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.23)",
      borderWidth: "1px",
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
  id: string;
  label: string;
  focus: boolean;
  controllerField: ControllerRenderProps<ChangePasswordFormInput, T>;
  controllerFieldState: ControllerFieldState;
};
export default function PasswordTextField({
  id,
  label,
  controllerField,
  controllerFieldState,
}: PasswordTextFieldProps<PasswordFieldName>) {
  return (
    <>
      <StyledPasswordField
        type='password'
        label={label}
        id={id}
        onChange={controllerField.onChange}
        error={controllerFieldState.invalid}
        name={controllerField.name}
        inputRef={controllerField.ref}
        fullWidth
        autoFocus
      />
    </>
  );
}
PasswordTextField.defaultProps = {
  focus: false,
};
