import { Theme, useTheme } from "@mui/material";
import { render } from "@testing-library/react";
import { useStore } from "react-redux";
import { Store } from "redux";
import { App } from "./App";
import { AppBar } from "./AppBar";
import { theme } from "./appTheme";
import { CurrentPage } from "./CurrentPage";
import { store } from "./reduxStore";

jest.mock("./AppBar");
jest.mock("./CurrentPage");

let appBarTheme: Theme;
let currentPageTheme: Theme;
let appBarReduxStore: Store;
let currentReduxStore: Store;

jest.mocked(AppBar).mockImplementation(() => {
    appBarTheme = useTheme();
    appBarReduxStore = useStore();

    return <div>AppBar</div>;
});
jest.mocked(CurrentPage).mockImplementation(() => {
    currentPageTheme = useTheme();
    currentReduxStore = useStore();

    return <div>CurrentPage</div>;
});

describe("<App />", () => {
    it("renders a <CurrentPage /> and an <AppBar /> inside a theme and redux provider", () => {
        const app = render(<App />);

        expect(app.getByText("AppBar")).toBeInTheDocument();
        expect(app.getByText("CurrentPage")).toBeInTheDocument();
        expect(appBarTheme).toBe(theme);
        expect(currentPageTheme).toBe(theme);
        expect(appBarReduxStore).toBe(store);
        expect(currentReduxStore).toBe(store);
    });
})