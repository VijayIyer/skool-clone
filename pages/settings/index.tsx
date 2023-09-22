import ChangePasswordForm from "@/components/ChangePassword";
import { Grid, Typography } from "@mui/material";
import styles from "../../styles/Settings.module.css";
import React, { ReactNode, useState } from "react";
import TimedAlertBox from "@/components/common/TimedAlert/TimedAlert";

export default function Settings() {
  const [showPasswordAlert, setShowPasswordAlert] = useState<boolean>(false);
  const renderAlert = () => {
    setShowPasswordAlert(true);
    // this timeout needs to be cleared to prevent memory leakage
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setShowPasswordAlert(false);
    }, 5000);
  };
  return (
    <>
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
              <ChangePasswordForm onSubmissionSucessAlert={renderAlert} />
            </main>
          </Grid>
        </Grid>
      </Grid>
      {
        <TimedAlertBox
          sx={{
            backgroundColor: "black",
            color: "white",
            fontSize: "large",
            borderRadius: "10px",
            overflow: "hidden",
            width: "fit-content",
            padding: "1em",
            zIndex: "1",
            margin: "1em",
            position: "absolute",
            left: 0,
            bottom: 0,
          }}
          message={"Password does not match"}
          alertVisibility={showPasswordAlert}
          setAlertVisibility={setShowPasswordAlert}
        />
      }
    </>
  );
}
