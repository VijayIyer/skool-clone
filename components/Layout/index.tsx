import React from "react";
import NavBar from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
