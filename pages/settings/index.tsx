import ChangePasswordForm from "@/components/ChangePassword";
import { Grid, Typography } from "@mui/material";
import styles from "../../styles/Settings.module.css";

export default function Settings() {
  return (
    <Grid
      container
      direction={"column"}
      spacing={2}
      sx={{
        backgroundColor: "#f8f7f5",
        height: "100vh",
      }}
    >
      {/* Header bar */}
      <Grid item xs={12}></Grid>
      <Grid container className={styles.settingsPageContentContainer}>
        <Grid item xs={3}>
          {/* The left sided navigation bar inside settings page */}
          <aside className={styles.navigationPanel}></aside>
        </Grid>
        <Grid item xs={9}>
          <main className={styles.settingsPageContent}>
            {/* Chosen component is based on option selected in navigation bar on the left */}
            <ChangePasswordForm />
          </main>
        </Grid>
      </Grid>
    </Grid>
  );
}
