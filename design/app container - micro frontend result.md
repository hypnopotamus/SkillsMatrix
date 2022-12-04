# Multiple Page Micro Frontends

[original design](./app%20container%20and%20multiple%20pages.md): using micro front-end technology and techniques the application UI container and each page can be developed and deployed separately. Dynamically loading portions of the UI allows for functionality such as restricting page content based on user roles; ordinarily all the of the UI code would be loaded in the browser and executing that code in the browser would determine visibility however with this approach restricted code would _not_ be loaded into the browser.

## Result: Success

Using HTML custom elements to create a micro frontend environment then using that as the tool to create a plugin architecture per page worked as expected and was fully successful.

## Third Party Documentation

https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements

## Original Assumptions

- the attribute `crossorigin="use-credentials"` on a script tag will include authorization headers
  - this has not yet been relevant, restricting page access by user principal has not been implemented in this MVP
- the documentation is correct, these methods for custom elements will be successful
  - this is true, the documentation was correct and did work as expected

## Lessons Learned

- having the "host" portion of the UI publish an API that can be referenced by "hosted" portions of the UI was important in maintaining flexibility between the host and the hosted
- while it might be possible to have different UI frameworks between different portions of the UI when implemented this way it creates a lot of overhead to do so; the freedom exists but exercising that freedom may be painful
- having a react child component render into a react parent component required using the "normal" micro frontend approach to load the javascript code and then the rendering code needed to be "hoisted" one DOM element

## See the Code

- [registerPage.ts](../UI/src/registerPage.ts) this is the API published for pages to consume
- [registerPageImpl.ts](../UI/src/registerPageImpl.ts) this contains the implementation of the API and notification that a page component has been discovered
- [Comparison/index.tsx](../UI/Comparison/src/index.tsx) this is where the page component registers itself as a page and provides the custom element class used to render the component when selected
- [<CurrentPage />](../UI/src/CurrentPage.tsx) this is where the currently selected page is rendered using the HTML portion of custom elements
- [ContentServer/index.ts](../UI/ContentServer/src/index.ts) this is the common frontend static content server, used to host the bundled build output (allowing it to be containerized) of the various frontend components and add functionality to hosting that content e.g. application insights for monitoring
