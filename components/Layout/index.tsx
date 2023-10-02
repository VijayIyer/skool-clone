import React from "react";
import NavBar from "./Navbar";
import style from "./style.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <div className={`${style.navbar_header}`}>
        <NavBar isDisplayTabs={true} isDisplaySearch={true} />
      </div>
      <main>{children}</main>
    </>
  );
}

export function AltLayout(props: LayoutProps) {
  const { children } = props;
  return (
    <>
      <div className={`${style.navbar_header}`}>
        <NavBar isDisplayTabs={false} isDisplaySearch={false} />
      </div>
      <main>{children}</main>
    </>
  );
}
