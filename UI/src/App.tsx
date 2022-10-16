import { ThemeProvider } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { AppBar } from "./AppBar";
import { theme } from "./appTheme";
import { CurrentPage } from "./CurrentPage";
import { store } from "./reduxStore";

//todo routing by current page
//https://github.com/hypnopotamus/SkillsMatrix/issues/30

export const App = () =>
    <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
            <AppBar />
            <CurrentPage />
        </ReduxProvider>
    </ThemeProvider>;