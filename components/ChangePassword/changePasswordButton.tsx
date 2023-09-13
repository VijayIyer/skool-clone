import { Button, Typography } from "@mui/material";
import styles from "./style.module.css";
interface ChangePasswordButtonPropsType {
  disabled: boolean;
}
export default function ChangePasswordButton({
  disabled,
}: ChangePasswordButtonPropsType) {
  return (
    <Button
      variant='contained'
      type='submit'
      className={styles.changePasswordButton}
      disabled={disabled}
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
  );
}
