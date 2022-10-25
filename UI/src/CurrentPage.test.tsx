import { store } from "./reduxStore";
import { pageSelected, pageRegistered, pageReducer } from "./pageReducer";
import { IPage } from "./IPage";
import { v4 as uuid } from "uuid";
import { Provider as ReduxProvider } from "react-redux";
import { CurrentPage, pageElementProperty } from "./CurrentPage";
import { Store } from "redux";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

const page: IPage = {
    name: uuid(),
    elementname: uuid(),
    selected: false
}

const ConnectedCurrentPage = ({ store }: { store: Store }) =>
    <ReduxProvider store={store}>
        <CurrentPage />
    </ReduxProvider>;

describe("<CurrentPage />", () => {
    describe("when a page is selected", () => {
        beforeEach(() => {
            store.dispatch(pageRegistered(page));
            store.dispatch(pageSelected(page))
        });

        it("renders that custom element into the placeholder div", () => {
            //fresh store every time
            const currentPage = render(<ConnectedCurrentPage store={store} />);

            expect(currentPage.container.children).toHaveLength(1);
            expect(currentPage.container.children[0]).toHaveAttribute("id", "the-page");
            const expectedInnerHtml = render(<div dangerouslySetInnerHTML={{ __html: `<${page.elementname} ${pageElementProperty}='the-page'/>` }} />).container.children[0].innerHTML;
            expect(currentPage.container.children[0].innerHTML).toBe(expectedInnerHtml);
        });
    })

    describe("when no page is selected", () => {
        const freshStore = configureStore({ reducer: { pages: pageReducer } });

        beforeEach(() => {
            freshStore.dispatch(pageRegistered(page));
        })

        it("renders an empty placeholder div", () => {
            const currentPage = render(<ConnectedCurrentPage store={freshStore} />);

            expect(currentPage.container.children).toHaveLength(1);
            expect(currentPage.container.children[0]).toBeEmptyDOMElement();
            expect(currentPage.container.children[0]).toHaveAttribute("id", "the-page");
        });
    });
});