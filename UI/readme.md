# UI Container

this is both the layout container and the plugin container.

## Page Plugins

To add a new page to the application

1. add a script tag to index.ejs for the page
1. in the entry point file of the page register the custom element class using the registerPage API (attached to global window)

pages are loaded as plugins using micro frontend technology (specifically window.customElements) and then are rendered into an empty div.

When rendered they are given a reference to that div itself through the abstract render method on the Page class so that the plugin can render in place rather than inside the div. It is not required to extend Page nor is it required to render directly onto the div used to mount the page as a custom element... it's not even necessary to use React, though it is highly recommended to remain consistent.

## Prod Deployment

currently CI is not set up to fully automate these steps

#### push the image

using the current package.json version (assuming the container has been built locally)
`docker image tag skills-matrix-ui-container techshowcaseskillsmatrix.azurecr.io/skills-matrix-ui-container`
`docker image tag skills-matrix-ui-container:1.0.3 techshowcaseskillsmatrix.azurecr.io/skills-matrix-ui-container:1.0.3`
`docker login techshowcaseskillsmatrix.azurecr.io`
`docker image push techshowcaseskillsmatrix.azurecr.io/skillsmatrix-uicontainer`
`docker image push techshowcaseskillsmatrix.azurecr.io/skills-matrix-ui-container:1.0.3`

### apply the helm chart

`helm upgrade --install skillsmatrix-uicontainer oci://localhost:5000/skillsmatrix-uicontainer --version 1.0.3 --set image.host=techshowcaseskillsmatrix.azurecr.io,image.name=skills-matrix-ui-container,image.tag=1.0.3`
`kubectl edit ing skillsmatrix-uicontainer` and remove the `host: localhost`, `kubectl get ing` should show the host as \*. This workaround is to overcome setting via commandline only the host as \* removing the rest of the ingress block
