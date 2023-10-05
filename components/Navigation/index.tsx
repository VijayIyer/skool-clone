import React, { useState, useRef, useEffect } from "react";
import NavBar from "./Navbar";
import { StyledEngineProvider } from "@mui/material";
import style from "./style.module.css";

interface NavigationProps {
  dispalySearch?: boolean;
  displayTab?: boolean;
}

export default function Navigation(props: NavigationProps) {
  const { displayTab = false, dispalySearch = false } = props;
  const [showSimpleBar, setShowSimpleBar] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setScrollPosition(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      setNavHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (scrollPosition != 0 && scrollPosition >= navHeight) {
      setShowSimpleBar(true);
    } else {
      setShowSimpleBar(false);
    }
  }, [scrollPosition]);

  return (
    <StyledEngineProvider injectFirst>
      <div ref={navbarRef} className={`${style.navbar_header}`}>
        <NavBar isDisplaySearch={dispalySearch} isDisplayTabs={displayTab} />
      </div>
      {/* a simpler navbar will slide in when page scroll down*/}
      {showSimpleBar ? (
        <div className={`${style.navbar_header2}`}>
          <NavBar isDisplaySearch={dispalySearch} isDisplayTabs={false} />
        </div>
      ) : null}
    </StyledEngineProvider>
  );
}

