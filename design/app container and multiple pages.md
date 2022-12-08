# Multiple Page Micro Frontends

## Elevator Pitch

In order to align the UI topology with the future security topology and keep the pages' development decoupled, the app container (the outermost portion) will be built so that each page acts as a micro front end plugin, each deployed to it's own hosting server.

## Assumptions

- the attribute `crossorigin="use-credentials"` on a script tag will include authorization headers
  - this will be important later when each micro frontend page will be expecting an Authorization header to decide whether to return the page's script or return nothing
- the documentation is correct, these methods for custom elements will be successful (within reason)

## Phases

### MVP

The app container, including the top bar and page menu, will be manually constructed and "registrations" will also be created manually (i.e. a developer will write the `<script />` tag into the index file manually). This phase will set up the foundations for using custom elements, to render each page, and for the registration of a page with the container for rendering the navigation menu.

### Automatic Registration (2 or 3)

Build a kubernetes operator that watches for ingresses with a configured annotation. The annotation is what marks an ingress as being for an app page. The operator will add or remove `<script />` tags from the index file as ingresses are added, removed, or updated with this annotation. That is to say that the operator will be writing and maintaining the code (in some fashion) to load each appropriate micro frontend page rather than having to do that manually based on what is deployed and active in the cluster.

### With Security (2 or 3)

Once an identity provider is established, each server for a page's micro fronted should begin to expect an appropriate Authorization header to determine who is requesting the page. If the requestor is authorized for the page, the server hosting that page will return the build output; however, if the requestor is not authorized, the server will return an empty script response: essentially, frontend authorization rules (coarse grained) effectively enforced on the backend. APIs that fulfill user actions are still responsible for actual enforcement of user authorization.

## Workflow

### MVP

1. a user navigates to the page's URL
1. a server returns the index file with the container script tag (normal) and each page's script tag (deferred)
1. when a page's script is loaded it should take top level actions to register itself as a page
   1. register itself as a custom element for the container to render
   1. register itself as a page for the nav menu
1. the container will render the menu with registered pages and render the corresponding custom element for the current page

## Architecture

Micro frontends let parts of an application get developed and deployed separately even if they create a single, cohesive whole when deployed. The app container should provide the API for a single page to register itself, one function with the DOM and the `window` global as the interop mechanisms. Even though the container and the pages will reside in a mono repo (and the micro frontends will reference the container API via file path) they don't necessary need to be connected so closely.

Micro frontend technology and implementation methods are a way to reach a plugin architecture, where each page is a plugin and plugins are coordinated by the container application acting as a mediator.

## Technical Details

- window.[customElements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) to register custom components
- [app bar with responsive menu](https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu) for consistent app container and menu
- script (defer)[https://www.w3schools.com/tags/att_script_defer.asp] for the pages' scripts to load them after the main script
- build the front end servers using express so that they can be extended with additional logic but have minimal overhead now
  - they should serve up the app bundle output of web pack
  - build one express server for all the front ends (and package it as a container)
    - for each front end, base the image off the server image, build the app output into the expected location, and push that image in turn

### patterns

- micro frontend: pieces of the front end are built like microservices, connected through technology agnostic interfaces (though there is still high value in consistency)
- kubernetes operator: code is written that subscribes to kubernetes state changes and performs additional automated actions on relevant changes
- mediator pattern: a design pattern where arrangement of, communication between, etc is held in one logical unit while the behaviors are held in the pieces the mediator is connecting
- plugin architecture: modules of code are dynamically discovered, registered, or loaded in some way. Plugins add or alter overall functionality of the application. In this case plugins add pages to the UI.

### technologies / frameworks

- react
- redux
- webpack
- express
- docker
- material UI
- typescript
- kubernetes
- window.customElements

### API Surface

- GET /index.html
  - for the container server
- GET /app.js
  - for all servers
- DOM and window global
  - this is the API for micro frontends to communicate through
  - window.customElements providers a registry of custom HTML tags that invoke a custom class that extends HTMLElement (or function that extends CustomElementConstructor; classes and functions are technically the same thing)
  - plugin registration API will be attached to the global window so that plugin scripts that are loaded can communicate with the mediator container

### Security

- later: access to portions of the application can be restricted (coarse grained, by page) on the backend, before any chance for tampering has occurred
  - the APIs tha fulfill user requests to get or change data or perform actions are still responsible for verifying that the requestor is authentication and authorized

## Other Options

- build a normal single page react app
  - this would be the most expedient and, in all honesty, this solution is intentionally over engineered... we're trying to show off here and have some fun, not just build another app!
