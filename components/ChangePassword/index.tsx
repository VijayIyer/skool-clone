import styles from "./style.module.css";
import {
  Typography,
  FormHelperText,
  Paper,
  Button,
  TextField,
} from "@mui/material";

export default function ChangePasswordForm() {
  return (
    <Paper className={styles.changePasswordContainer}>
      <div className={styles.headerContainer}>
        <Typography variant='type2' component={"p"} className={styles.header}>
          Change password
        </Typography>
      </div>
      <div className={styles.passwordFieldsContainer}>
        <div>
          <TextField
            autoFocus={true}
            type='password'
            label='Old password'
            variant='outlined'
            color={primary.dark}
          />
        </div>
        <div>
          <TextField type='password' label='New password' variant='outlined' />
        </div>
        <div>
          <TextField
            type='password'
            label='Confirm new password'
            variant='outlined'
          />
        </div>
      </div>

      <div>
        <Button
          variant='contained'
          type='submit'
          className={styles.changePasswordButton}
          disabled
        >
          <span className={styles.changePasswordButtonLabel}>
            <Typography
              variant='p'
              component='p'
              sx={{
                fontSize: "1em",
              }}
            >
              Change Password
            </Typography>
          </span>
        </Button>
      </div>
    </Paper>
  );
}
