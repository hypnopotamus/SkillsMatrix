import { AppBar as MaterialAppBar, Toolbar, Button, Typography } from "@mui/material";

import { NavigationMenu } from "./NavigationMenu";

// TODO: wire buttons up to update page selected (? I think that's what these are supposed to do)
export const AppBar = () => {
    console.log('App Bar');
    const handleClick = (value: string) => {
        console.log(`${value} button clcked`);
    };
    return (
        <MaterialAppBar position="static">
            <Toolbar>
                <div>
                    <Typography>nvisia</Typography>
                </div>
                <div>
                    <Button
                        variant="text"
                        value="skills-matrix"
                        onClick={() => handleClick("skills-matrix")}
                    >Skills Matrix</Button>
                    <Button
                        variant="text"
                        value="performance-review"
                        onClick={() => handleClick("performance-review")}
                    >Performance Review</Button>
                </div>
            </Toolbar>
        </MaterialAppBar>
    );
}
