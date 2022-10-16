import { AppBar as MaterialAppBar, Toolbar } from "@mui/material";
import { NavigationMenu } from "./NavigationMenu";

export const AppBar = () =>
    <MaterialAppBar position="static">
        <Toolbar>
            <NavigationMenu />
        </Toolbar>
    </MaterialAppBar>
