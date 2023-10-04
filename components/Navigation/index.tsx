import React from "react";
import NavBar from "./Navbar";
import { StyledEngineProvider } from "@mui/material";
import style from "./style.module.css";

interface NavigationProps {
  displayTab?: boolean;
  dispalySearch?: boolean;
}

export default function Navigation(props: NavigationProps) {
  const { displayTab = false, dispalySearch = false } = props;

  return (
    <StyledEngineProvider injectFirst>
      <div className={`${style.navbar_header}`}>
        <NavBar isDisplayTabs={displayTab} isDisplaySearch={dispalySearch} />
      </div>
    </StyledEngineProvider>
  );
}

// export function AltLayout(props: LayoutProps) {
//   const { children } = props;
//   return (
//     <>
//       <div className={`${style.navbar_header}`}>
//         <NavBar isDisplayTabs={false} isDisplaySearch={false} />
//       </div>
//       <main>{children}</main>
//     </>
//   );
// }
