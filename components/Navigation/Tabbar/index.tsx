import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import style from "./tabbar.module.css";

interface itemsProps {
  itemsList: { name: string; number: number }[];
}

export default function TabBar(props: itemsProps) {
  const { itemsList } = props;
  const [items, setItems] =
    useState<{ name: string; number: number }[]>(itemsList);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          "& button: focus": {
            color: "black",
          },
          "& button: hover": {
            color: "black",
          },
          "& button: active": {
            color: "black",
          },

        }}
        TabIndicatorProps={{
          sx: {
            backgroundColor: "black",
            height: 4,
            weigh: "bold",
          }
        }}
      >
        {items.map((item) => (
          <Tab
            label={item.name}
            key={item.name}
            className={`${style.tabBar_tab}`}
          />
        ))}
      </Tabs>
    </Box>
  );
}
