//import order matters, at runtime it is ensure by script run order
import "./registerPageImpl";
import { v4 as uuid } from "uuid";
import { store } from "./reduxStore";
import { registerPage } from "./registerPage";

jest.mock("uuid");

describe("registerPage", () => {
    class TestElement extends HTMLElement { };
    const name = "name"
    const id = "id";
    jest.mocked(uuid).mockReturnValue(id);

    registerPage(name, TestElement);

    it("creates a custom element definition", () => {
        const registeredCustomComponent = window.customElements.get(`${name}-${id}`);
        expect(registeredCustomComponent).toBe(TestElement);
    });

    it("dispatches the page registered redux action", () => {
        expect(store.getState().pages).toContainEqual({ name, elementname: `${name}-${id}`, selected: false });
    });
});