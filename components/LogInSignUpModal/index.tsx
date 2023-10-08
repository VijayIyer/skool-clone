import {LOGIN_SIGN_UP_COMPONENT_SIGN_UP} from "@/constant";
import SignUpForm from "../Signup";
import LogInForm from "../Login";
import styles from './style.module.css'
import {FC} from "react";

type LogInSignUpModalProps = {
    style: string;
    resetModalStyle: () => void;
    switchToSignUp: () => void;
    switchToLogIn: () => void;
}
const LogInSignUpModal:FC<LogInSignUpModalProps> = ({style, resetModalStyle, switchToSignUp, switchToLogIn}) => {

    return (
        <div className={styles.modalContainer__div} data-testid='modal-container'>
            <div onClick={resetModalStyle} className={styles.backgroundColorContainer__div} data-testid='modal-background'></div>
            <div className={styles.formContainer__div}>
                {style === LOGIN_SIGN_UP_COMPONENT_SIGN_UP ? (
                    <SignUpForm switchToLogIn={switchToLogIn} data-testid='sign-up-container' />
                ) : (
                    <LogInForm switchToSignUp={switchToSignUp} data-testid='login-container' />
                )}
            </div>
        </div>
    )
}

export default LogInSignUpModal;