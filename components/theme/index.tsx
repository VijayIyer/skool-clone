import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F1D07C",
      contrastText: "#202124"
    },
  },
  typography: {
    button: {
      fontWeight: 700,
      lineHeight: 1.5,
    },
  },
});

export default function MuiThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
