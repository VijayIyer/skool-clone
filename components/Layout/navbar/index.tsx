import { AppBar, Toolbar } from "@mui/material";
import Search from "../searchbar";
import LoginSignUpBar from "../loginsection";
import GroupSwitch from "../groupswitcher";
import UserSection from "../usersection";
import Tabs from "../tabbar";
import { useState } from "react";

// interface NavBarProps {
//   children: React.ReactNode;
// }

export default function NavBar() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
        <GroupSwitch />
        <Search />
        {isLogedIn ? <UserSection /> : <LoginSignUpBar />}
      </Toolbar>
      <Tabs />
    </AppBar>
  );
}
