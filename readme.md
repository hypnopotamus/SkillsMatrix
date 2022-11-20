# Summary

in the server directory is the backend, a nest.js rest API backed by a graph DB using a gremnlin API

in the UI directory you'll find the front end, a material UI react app that presents the data from the server ReST API

# Running

`npm install` from this directory will install packages normally then it will start up local build infrastructure (OCI container registry, npm package registry), then it will `npm install` for sub packages. For packages that reference local code through the local package registry their install will be delayed until their dependencies are published. For packages that are referenced they will be `npm run build` then `npm publish` after their `npm install`

`npm start` from this directory will start both UI and server. This means that an ingress controller will be installed in your local kubernetes cluster using terraform then containers will be built and pushed to the local registry as well as helm charts then those helm charts will be installed on the local cluster which will pull the container into the cluster and start it.

`npm run db:seed` from the server directory will seed the local database with the default nvisia skills matrix object graph
