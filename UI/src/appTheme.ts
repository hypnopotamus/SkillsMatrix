import { createTheme } from "@mui/material/styles";

export const nvColors = {
    nvWhite: "#FFFFFF",
    nvAlmostBlack: "#001924",
    nvRed: "#A42643",
    nvOrange: "#E46528",
    nvYellowOrange: "#F49E1D",
    nvAqua: "#6FC7B4",
    nvMidBlueMedium: "#2C3361",
    nvMidBlueDark: "#003148",
    nvMidBlueLight: "#425D93",
    nvLightBlueMuted: "#A9CDE3",
    nvLightBlueBright: "#BCE0FD",
    nvLightGrey: "#E0E1E1",
    nvLightBlueGrey: "#d4d8dd",
    nvDarkGrey: "#3D3E3F"
};

export const nvStandards = {
    nvBorderRadius: "3px",
    nvBorderThickness: "2px",
    nvMinWidth: "250px"
}

// TODO: not sure if we'll want to create a light & dark theme or if this is the place to do it...
export const nvTheme = {
    lightMode: {
        color: nvColors.nvMidBlueMedium,
        backgroundColor: nvColors.nvWhite,
    },
    ...nvColors
};

export const theme = createTheme({
    palette: {
        // orange
        primary: {
            main: nvColors.nvOrange,
            light: nvColors.nvYellowOrange
        },
        // blues
        secondary: {
            main: nvColors.nvMidBlueMedium,
            light: nvColors.nvMidBlueLight,
            dark: nvColors.nvMidBlueDark
        },
        grey: {
            300: "#E0E1E1",
            500: "#d4d8dd",
            800: "#3D3E3F"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: nvColors.nvMidBlueDark,
                    borderRadius: nvStandards.nvBorderRadius,
                    color: nvColors.nvWhite
                },
                text: {
                    backgroundColor: "inherit"
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: nvColors.nvMidBlueMedium
                }
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    justifyContent: "space-between"
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: nvStandards.nvBorderRadius,
                    borderColor: nvColors.nvOrange,
                    borderWidth: nvStandards.nvBorderThickness,
                    color: nvColors.nvDarkGrey,
                    minWidth: nvStandards.nvMinWidth
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: nvStandards.nvBorderRadius,
                    borderColor: nvColors.nvOrange,
                    borderWidth: nvStandards.nvBorderThickness,
                    color: nvColors.nvDarkGrey
                }
            }
        }
    }
});