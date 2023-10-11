import { AppBar, Toolbar, Slide } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Search from "../Searchbar";
import LoginSignUpBar from "../Loginsection";
import GroupSwitch from "../Groupswitcher";
import UserSection from "../Usersection";
import TabBar from "../Tabbar";
import { useState, useRef } from "react";
import style from "./navbar.module.css";

interface NavBarProps {
  className?: string;
  isDisplayTabs?: boolean;
  isDisplaySearch?: boolean;
}

export default function NavBar(props: NavBarProps) {
  const { className, isDisplayTabs = false, isDisplaySearch = false } = props;
  const [isLogedIn, setIsLogedIn] = useState(true);
  const containerRef = useRef<HTMLElement>(null);

  let tabs = [
    { name: "Community", number: 1 },
    { name: "Classroom", number: 1 },
    { name: "Calendar", number: 1 },
    { name: "Members", number: 1 },
    { name: "LeaderBoard", number: 1 },
    { name: "About", number: 1 },
  ];
  const trigger = useScrollTrigger();

  return (
    <AppBar elevation={0} className={`${style.navbar_root}`} ref={containerRef}>
      <Toolbar className={`${style.navbar_toolbar}`}>
        <GroupSwitch />
        {isDisplaySearch ? <Search /> : null}
        {isLogedIn ? <UserSection /> : <LoginSignUpBar />}
      </Toolbar>
      {isDisplayTabs ? <TabBar itemsList={tabs} /> : null}
    </AppBar>
  );
}
