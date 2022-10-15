# Multiple Page Micro Frontends

## Elevator Pitch

In order to align the UI topology with the future security topology and keep the pages' development decoupled the app container (MUI terminology, the outermost portion) will be built to have each page act as a micro front end, each deployed to it's own

## Assumptions

- the attribute `crossorigin="use-credentials"` on a script tag will include authorization headers
  - this is important for later when each micro frontend page will be expecting an Authorization header to decide whether to return the page's script or return nothing
- the documentation is correct, these methods for custom elements will be successful (within reason)

## Phases

### MVP

The app container, including the top bar and page menu, will be manuall constructed and "registrations" done manually (i.e. a developer will write the `<script />` tag into the index file manually). This phase will set up the foundations for using custom elements to render each page and registration of a page with the container for rendering the navigation menu.

### Automatic Registration (2 or 3)

Build a kubernetes operator that watches for ingresses with a configured annotation. The annotation is what marks an ingress as being for an app page. The operator will add or remove `<script />` tags from the index file as ingresses are added, removed, or updated with this annotation. That is to say that the operator will be writing the code to load each appropriate micro frontend page rather than having to do that manually.

### With Security (2 or 3)

Once an identity provider is established each server for a page's micro fronted should begin to expect an appropriate Authorization header to determine who is requesting the page. If the requestor is authorized for the page hosted by a given server then return the build output and if they are not authorized return an empty script response; frontend authorization rules (coarse grained) effectively enforced backend. APIs that fulfill user actions are still responsible for actual enforcement of user authorization.

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

## Technical Details

- window.[customElements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) to register custom components
- [app bar with responsive menu](https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu) for consistent app container and menu
- script (defer)[https://www.w3schools.com/tags/att_script_defer.asp] for the pages' scripts to load them after the main script
- build the front end servers using express so that they can be extended with additional logic but have minimal overhead now
  - they should serve up the app bundle output of web pack
  - build one express server for all the front ends (and package it as a container) then, for each front end, base the image off the server image, build the app output into the expected location, and push that image in turn

### patterns

- micro frontend: pieces of the front end are built like microservices, connected through technology agnostic interfaces (though there is still high value in consistency)
- kubernetes operator: code is written that subscribes to kubernetes state changes and performs additional automated actions on relevant changes

### technologies / frameworks

- react
- express
- docker
- material UI
- typescript
- kubernetes

### API Surface

- GET /index.html
  - for the container server
- GET /app.js
  - for all servers

### Security

- later: access to portions of the application can be restricted (coarse grained, by page) on the backend, before any chance for tampering has occurred
  - the APIs tha fulfill user requests to get or change data or perform actions are still responsible for verifying that the requestor is authentication and authorized

## Other Options

- build a normal single page react app
  - this would be the most expedient and, in all honesty, this solution is intentionally over engineered... we're trying to show off here and have some fun, not just build another app!
