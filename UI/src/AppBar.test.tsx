import { AppBar } from "./AppBar";
import { AppBar as MaterialAppBar, Toolbar } from "@mui/material";
import { NavigationMenu } from "./NavigationMenu";
import { render } from "@testing-library/react";

jest.mock("@mui/material", () => {
    const originalModule = jest.requireActual<typeof import("@mui/material")>("@mui/material");

    return {
        __esModule: true,
        ...originalModule,
        AppBar: jest.fn(originalModule.AppBar),
        Toolbar: jest.fn(originalModule.Toolbar)
    };
});
jest.mock("./NavigationMenu");

jest.mocked(MaterialAppBar).mockImplementation(({ children }) => <div id="MaterialAppBar">{children}</div>);
jest.mocked(Toolbar).mockImplementation(({ children }) => <div id="Toolbar">{children}</div>);
jest.mocked(NavigationMenu).mockImplementation(() => <div>NavigationMenu</div>);

describe("<AppBar />", () => {
    it("renders a navigation menu inside a toolbar in an app bar", () => {
        const appBar = render(<AppBar />);

        const navigationMenu = appBar.getByText("NavigationMenu");
        expect(navigationMenu.parentElement).toHaveAttribute('id', 'Toolbar');
        expect(navigationMenu.parentElement!.parentElement).toHaveAttribute('id', 'MaterialAppBar');
    })
});