import React, { useState } from "react";
import { List, ListItem, ListItemButton } from "@mui/material";

interface tabsProps {
  tabList: Array<{ name: string; number: number }>;
}

export default function Tabs(props: tabsProps) {
  const { tabList } = props;
  const [tabs, setTabs] = useState<{ name: string; number: number }[]>(tabList);
  // need modify rendertab later
  function renderTab(name: string) {
    return <ListItemButton key={name}>{name}</ListItemButton>;
  }
  return (
    <List
      sx={{
        display: "flex",
        // flexDirection: "row",
        // justifyContent: "flex-start",
      }}
    >
      {tabs.map((tab) => {
        return (
            <ListItem key={tab.name}>
                {renderTab(tab.name)}
            </ListItem>
        )
      })}
    </List>
  );
}
