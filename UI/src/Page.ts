import { pageElementProperty } from "./CurrentPage";

export abstract class Page extends HTMLElement {
    abstract render(mountPoint: Element): void;

    connectedCallback() {
        const elementId = this.getAttribute(pageElementProperty);
        const mountPoint = document.querySelector(`#${elementId}`);
        this.render(mountPoint!);
    }
}