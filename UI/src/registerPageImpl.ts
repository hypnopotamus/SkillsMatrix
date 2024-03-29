import { IPage } from "./IPage";
import { v4 as uuid } from "uuid";
import { store } from "./reduxStore";
import { pageRegistered } from "./pageReducer";
import { RegisterPage } from "./RegisterPageType";

const registerPage: RegisterPage = (name, constructor) => {
    const elementname = `${name.toLowerCase()}-${uuid()}`;
    window.customElements.define(elementname, constructor);

    const page: IPage = { name, elementname, selected: false };
    store.dispatch(pageRegistered(page));
}

(window as any).registerPage ??= registerPage;