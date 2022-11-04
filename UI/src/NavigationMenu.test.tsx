import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider as ReduxProvider } from "react-redux";
import { v4 as uuid } from "uuid";
import { IPage } from "./IPage";
import { NavigationMenu } from "./NavigationMenu";
import { pageRegistered } from "./pageReducer";
import { store } from "./reduxStore";

const pageFactory = (): IPage => {
    const page: IPage = {
        name: uuid(),
        elementname: uuid(),
        selected: false
    };

    store.dispatch(pageRegistered(page));

    return page;
};
const pages: readonly IPage[] = [
    pageFactory(),
    pageFactory(),
    pageFactory()
];

const ConnectedNavigationMenu = () =>
    <ReduxProvider store={store}>
        <NavigationMenu />
    </ReduxProvider>;

describe("<NavigationMenu />", () => {
    it("renders each page in a button", () => {
        const menu = render(<ConnectedNavigationMenu />);

        const buttons = menu.getAllByRole("button");
        for (const page of pages) {
            const pageElement = menu.getByText(page.name);
            expect(buttons).toContain(pageElement);
        }
    });

    describe("clicking a page button", () => {
        it("selects the page", async () => {
            const unselectedPage = store.getState().pages.find(p => !p.selected)!;

            const menu = render(<ConnectedNavigationMenu />);
            const pageButton = await menu.findByText(unselectedPage.name);
            await userEvent.click(pageButton);

            const endingPageState = store.getState().pages
                .find(p => p.name === unselectedPage.name && p.elementname === unselectedPage.elementname);
            expect(endingPageState?.selected).toBe(true);
        });
    })
});

export { };

