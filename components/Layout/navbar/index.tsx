import { AppBar, Toolbar } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import Search from "../Searchbar";
import LoginSignUpBar from "../Loginsection";
import GroupSwitch from "../Groupswitcher";
import UserSection from "../Usersection";
import Tabs from "../Tabbar";
import { useState } from "react";
import style from "./navbar.module.css"

interface NavBarProps {
  className?: string;
  isDisplayTabs?: boolean;
  isDisplaySearch?: boolean;
}

export default function NavBar(props: NavBarProps) {
  const { className, isDisplayTabs, isDisplaySearch } = props;
  const [isLogedIn, setIsLogedIn] = useState(true);

  let tabs = [
    { name: "Community", number: 1 },
    { name: "Classroom", number: 1 },
    { name: "Calendar", number: 1 },
    { name: "Members", number: 1 },
    { name: "LeaderBoard", number: 1 },
    { name: "About", number: 1 },
  ];

  return (
    <StyledEngineProvider injectFirst>
      <AppBar elevation={0} className={`${style.navbar_root}`}>
        <Toolbar className={`${style.navbar_toolbar}`}>
          <GroupSwitch />
          {isDisplaySearch ? <Search /> : <></>}
          {isLogedIn ? <UserSection /> : <LoginSignUpBar />}
        </Toolbar>
        {isDisplayTabs ? <Tabs tabList={tabs} /> : <></>}
      </AppBar>
    </StyledEngineProvider>
  );
}
