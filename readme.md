# Summary

in the server directory is the backend, a nest.js rest API backed by a graph DB using a gremnlin API

in the UI directory you'll find the front end, a material UI react app that presents the data from the server ReST API

# Running

`npm install` from this directory will install packages normally then it will start up local build infrastructure (OCI container registry, npm package registry), then it will `npm install` for sub packages. For packages that reference local code through the local package registry their install will be delayed until their dependencies are published. For packages that are referenced they will be `npm run build` then `npm publish` after their `npm install`

`npm start` from this directory will start both UI and server. This means that an ingress controller will be installed in your local kubernetes cluster using terraform then containers will be built and pushed to the local registry as well as helm charts then those helm charts will be installed on the local cluster which will pull the container into the cluster and start it.

`npm run db:seed` from the server directory will seed the local database with the default nvisia skills matrix object graph. `kubectl apply -f ./seed-job.yaml` will run the seed scripts from inside the cluster (useful for prod where the database might not be exposed to your local machine)

# Deploying

## Local

The steps are carried out by the scripts tied to `npm install` and `npm start` of the root package.json (see [running](#running) ). Terraform state is stored in the local kubernetes cluster. Supporting infrastructure code can be found in infrastructure/local

## Azure

Azure infrastructure code can be found in infrastructure/prod.

The azure CLI is required to store the terraform state in azure storage. You must also log in with `az login` before `terraform init` will be able to connect to azure to read or write state.

To deploy to Azure `terraform init` then `terraform apply` from infrastructure/prod. Afterwards there will be a kubernetes cluster, a container registry (which the cluster has access to pull from), Azure Monitor + conneciton string secrets in the cluster, an application gateway ingress controller, and a database. Container images will need to be built into the repository and charts installed to the cluster. `az aks get-credentials skillsmatrix` will merge kubectl credentials for the cluster into your kubeconfg, assuming you have access to the Azure subscription. `kubectl config use-context skillsmatrix` will set the context to be the cluster in Azure.

### Cosmos

The original plan was to use Cosmos db as the prod database to replace Tinkerpop Gremlin Server as the local in-memory db. Turns out that Cosmos gremlin API is incomplete and out of date. Specifically it does not support bytecode, which is required for the fluent Gremlin API (meaning the only option is the stringly typed, non-interactive, less performant `client.submit`) and it only supports up to GraphSON v2 (the current version is v3)... there might be more missing. Replies from MS staff went silent about 4 years ago (as of 11/2022) on plans to complete the Gremlin API after claims were made that they would be completing work within 6 months (specifically for bytecode support).

A single instance of a Tinkerpop Gremlin Server isn't suitable for a production workload; losing the pod instance means losing the data and it should be assumed that any pod can be lost at any time without warning. For a science fair, however... 🤔
