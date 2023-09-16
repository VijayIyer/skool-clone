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
    >
      <span className={styles.changePasswordButtonLabel}>
        <Typography
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
  );
}
ChangePasswordButton.defaultProps = {
  disabled: false,
};
