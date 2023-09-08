import { AppBar, Toolbar } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import Search from "../searchbar";
import LoginSignUpBar from "../loginsection";
import GroupSwitch from "../groupswitcher";
import UserSection from "../usersection";
import Tabs from "../tabbar";
import { useState } from "react";
import style from "@/styles/Navbar.module.css";

interface NavBarProps {
  className?: string;
}

export default function NavBar(props: NavBarProps) {
  const { className } = props;
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
      <AppBar className={`${style.navbar_root}`}>
        <Toolbar className={`${style.navbar_toolbar}`}>
          <GroupSwitch />
          <Search />
          {isLogedIn ? <UserSection /> : <LoginSignUpBar />}
        </Toolbar>
        <Tabs tabList={tabs} />
      </AppBar>
    </StyledEngineProvider>
  );
}
