import styles from "./styles.module.css";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Alert, { AlertProps } from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";

type TimedAlertBoxProps = AlertProps & {
  message: string;
  alertVisibility: boolean;
  setAlertVisibility: Dispatch<SetStateAction<boolean>>;
};
export default function TimedAlertBox({
  message,
  alertVisibility,
  setAlertVisibility,
  ...rest
}: TimedAlertBoxProps) {
  return (
    <Fade
      in={alertVisibility} //Write the needed condition here to make it appear
      timeout={{ enter: 1000, exit: 5000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
    >
      <Alert
        icon={false}
        variant='filled'
        className='alert'
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            onClick={() => {
              setAlertVisibility(false);
            }}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
        {...rest}
      >
        {message}
      </Alert>
    </Fade>
  );
}
