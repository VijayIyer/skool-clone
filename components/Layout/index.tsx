import React from "react";
import NavBar from "./Navbar"
import style from "@/styles/Navbar.module.css";
import { StyledEngineProvider } from "@mui/material/styles";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <StyledEngineProvider injectFirst>
      <div className={`${style.header}`}>
        <NavBar isDisplayTabs={true} isDisplaySearch={true} />
      </div>
      <main>{children}</main>
    </StyledEngineProvider>
  );
}

export function AltLayout(props: LayoutProps) {
  const { children } = props;
  return (
    <StyledEngineProvider injectFirst>
      <div className={`${style.header}`}>
        <NavBar isDisplayTabs={false} isDisplaySearch={false} />
      </div>
      <main>{children}</main>
    </StyledEngineProvider>
  );
}
