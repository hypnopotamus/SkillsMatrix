import { blue, green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        common: {
            black: '#000',
            white: '#FFF'
        },

        primary: // blues
        {
            main: '#425D93', // Steel Blue - accent is Powder Blue "primary[light]"
            dark: '#2D3361', // Navy Blue - accent is Dark Gray "grey[900]"
            light: '#A9CFEE' // Powder - accent to Steel Blue "primary[main]"
        },
        secondary: // oranges (and a green)
        {
            light: '#F99E1C', // Marigold Yellow - accent is Light Gray or "grey[400]"
            main: '#E56529', // Red Orange - accent is white
            dark: '#6FC7B4', // seafoam green-like color
        },
        grey: {
            400: '#E0E1E2', // Light Gray - accent to Marigold Yellow "secondary[light]"
            900: '#111325', // Dark Gray - accent to Navy Blue "primary[dark]"
        }
    },
    typography: {
        htmlFontSize: 16,
        fontFamily: "sans-serif",
        h1: {
            fontFamily: "sans-serif",
            fontWeight: 300,
            fontSize: "6rem",
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
            textTransform: "uppercase"
        },
        subtitle1: {
            fontFamily: "sans-serif",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.7,
            letterSpacing: "-0.00938em"
        },
        body1: {
            fontFamily: "sans-serif",
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.5,
            letterSpacing: "-0.00938em"
        },
        // body2 button caption overline
    },
});