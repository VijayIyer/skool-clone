import { Button, Typography, ButtonProps } from "@mui/material";
import styles from "./style.module.css";
type ChangePasswordButtonProps = ButtonProps & {
  disabled: boolean;
};
export default function ChangePasswordButton({
  disabled,
  ...rest
}: ChangePasswordButtonProps) {
  return (
    <Button
      {...rest}
      variant='contained'
      type='submit'
      className={styles.changePasswordButton}
      disabled={disabled}
      disableElevation
    >
      <span className='MuiButton-label'>
        <Typography className={styles.changePasswordButtonLabel} component='p'>
          Change Password
        </Typography>
      </span>
    </Button>
  );
}
ChangePasswordButton.defaultProps = {
  disabled: false,
};
