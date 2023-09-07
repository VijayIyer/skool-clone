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
  let tabs = [
    {name: "Community", number: 1},
    {name: "Classroom", number: 1},
    {name: "Calendar", number: 1},
    {name: "Members", number: 1},
    {name: "LeaderBoard", number: 1},
    {name: "About", number: 1},
  ]

  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
        <GroupSwitch />
        <Search />
        {isLogedIn ? <UserSection /> : <LoginSignUpBar />}
      </Toolbar>
      <Tabs tabList={tabs}/>
    </AppBar>
  );
}
