import { Button, Typography } from "@mui/material";
import styles from "./style.module.css";
interface ChangePasswordButtonProps {
  disabled: boolean;
}
export default function ChangePasswordButton({
  disabled,
}: ChangePasswordButtonProps) {
  return (
    <Button
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
