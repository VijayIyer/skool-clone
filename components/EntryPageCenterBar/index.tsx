import { Stack, Button, Link } from "@mui/material";
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "rgb(248, 212, 129)",
            contrastText: 'rgb(32, 33, 36)'
        },
        secondary: {
            main: "rgb(255, 255, 255)",
            contrastText: 'rgb(144, 144, 144)'
        },
    },
});

const StyledButton = styled(Button)`
  ${({ theme }) => `
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-style: normal;
  font-size: 16px;
  line-height: 1.5
  `}
`;

export default function EntryPageCenterBar() {
    return (
        <ThemeProvider theme={theme}>
            <Stack sx={{
                mb: "54px"
            }} spacing={2} direction="row">
                <StyledButton color="primary" variant="contained" size="large" href="/signup">
                    Create Your Community
                </StyledButton>
                <StyledButton color="secondary" variant="contained" size="large" href="/community">
                    See it in Action
                </StyledButton>
            </Stack>
        </ThemeProvider>
    )
}