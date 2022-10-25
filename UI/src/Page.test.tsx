import { render } from "@testing-library/react";
import { Page } from "./Page";
import { pageElementProperty } from "./CurrentPage";

class TestPage extends Page {
    public mountedIn?: Element;

    render(mountPoint: Element): void {
        this.mountedIn = mountPoint;
    }
};

describe("Page", () => {
    it("renders in the element given by pageElementId", () => {
        const pageElementId = "page-element-id";
        window.customElements.define("test-page", TestPage);

        const mountPoint = render(<div id={pageElementId} />);
        const element = new TestPage();
        element.setAttribute(pageElementProperty, pageElementId);
        element.connectedCallback();

        expect(element.mountedIn).toBe(mountPoint.container.children[0]);
    });
});