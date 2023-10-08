import MuiThemeProvider from "@/components/theme";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import {useState} from "react";

import LogInSignUpModal from "@/components/LogInSignUpModal";
import {LOGIN_SIGN_UP_COMPONENT_LOGIN, LOGIN_SIGN_UP_COMPONENT_SIGN_UP} from "@/constant";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ['latin'],
  variable: '--font-roboto'
})

export default function App({ Component, pageProps }: AppProps) {
  // the following const is for temperate use only, login state should be saved in global state management tool.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalStyle, setModalStyle] = useState('');
  const resetModalStyle = () => {
    setModalStyle('')
  }
  const switchToSignUp = () => {
    setModalStyle(LOGIN_SIGN_UP_COMPONENT_SIGN_UP)
  }
  const switchToLogIn = () => {
    setModalStyle(LOGIN_SIGN_UP_COMPONENT_LOGIN)
  }

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
    <MuiThemeProvider>
      {/**
       *  the following div is for testing only
       *  make sure to delete it for merge into dev branch
       */}
      <div>
        <button data-testid='login-btn' onClick={() => {setModalStyle(LOGIN_SIGN_UP_COMPONENT_LOGIN)}}>Log in</button>
        <button data-testid='signup-btn' onClick={() => {setModalStyle(LOGIN_SIGN_UP_COMPONENT_SIGN_UP)}}>Sign up</button>
      </div>

      <Component {...pageProps} />

      {/*resetModalStyle function should be saved in a global state management tool*/}
      {!isLoggedIn && modalStyle && (
          <LogInSignUpModal
              style={modalStyle}
              resetModalStyle={resetModalStyle}
              switchToSignUp={switchToSignUp}
              switchToLogIn={switchToLogIn}
          />
      )}
    </MuiThemeProvider>
    </>
  );
}
