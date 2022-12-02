# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

this has already been done

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Prod Deployment

currently CI is not set up to fully automate these steps

#### push the image

using the current package.json version (assuming the container has been built locally)
`docker image tag skills-matrix-ui-comparison techshowcaseskillsmatrix.azurecr.io/skills-matrix-ui-comparison`
`docker image tag skills-matrix-ui-comparison:0.1.3 techshowcaseskillsmatrix.azurecr.io/skills-matrix-ui-comparison:0.1.3`
`docker login techshowcaseskillsmatrix.azurecr.io` note: you will need the password from the Azure Portal to log in. You may need to enable "admin account" in the Azure portal
`docker image push techshowcaseskillsmatrix.azurecr.io/skills-matrix-ui-comparison`
`docker image push techshowcaseskillsmatrix.azurecr.io/skills-matrix-ui-comparison:0.1.3`

### apply the helm chart

`helm upgrade --install skillsmatrix-ui-comparison oci://localhost:5000/skillsmatrix-ui-comparison --version 0.1.3 --set image.host=techshowcaseskillsmatrix.azurecr.io,image.name=skills-matrix-ui-comparison,image.tag=0.1.3`
`kubectl edit ing skillsmatrix-ui-comparison` and remove the `host: localhost`, `kubectl get ing` should show the host as \*. This workaround is to overcome setting via commandline only the host as \* removing the rest of the ingress block
