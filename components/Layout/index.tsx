import React from "react";
import NavBar from "./navbar";
import style from "@/styles/Navbar.module.css"

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <div className={`${style.header}`}>
        <NavBar />
      </div>
      <main>{children}</main>
    </>
  );
}
