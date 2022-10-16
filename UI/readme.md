# UI Container

this is both the layout container and the plugin container.

## Page Plugins

To add a new page to the application

1. add a script tag to index.ejs for the page
1. in the entry point file of the page register the custom element class using the registerPage API (attached to global window)

pages are loaded as plugins using micro frontend technology (specifically window.customElements) and then are rendered into an empty div.

When rendered they are given a reference to that div itself through the abstract render method on the Page class so that the plugin can render in place rather than inside the div. It is not required to extend Page nor is it required to render directly onto the div used to mount the page as a custom element... it's not even necessary to use React, though it is highly recommended to remain consistent.
