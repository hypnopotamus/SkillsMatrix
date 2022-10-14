# Skills Matrix

### infrastructure, CI/CD, basic devops

## Elevator Pitch

In order to be usable the application needs to be deployed somewhere. In order to make that deployment easy and stable Infrastructure as Code will be used to define the infrastructure environment both locally (for development) and in the cloud. Local development will take place in an environment similar to the cloud environment to reduce "worked on my machine" syndrome.

## Assumptions

- Docker is installed on the developer machine as a part of local setup
  - the Docker kubernetes "cluster" is enabled or an alternative local docker cluster is setup
- the free tier of gitlab CI will be more than enough throughput
- it won't be terribly tedious to grant gitlab CI access to Azure for terraform or to the kubernetes cluster that terraform creates
- we will continue to use Chris Dykstra's Azure free tier subscription
  - using the application gateway ingress controller will give an easy place to manually shut off access to the app resources
  - if anything goes outside the free tier it will be shut down until the tech showcase

## Workflow

1. local setup
   1. project readme outlines the tools that need to be installed and the commands that need to be run
   1. docker compose
      1. starts up a local helm chart repository
      1. starts up a local container registry
1. local development
   1. git branch is created from master and checked out
   1. `npm start` from the project root
      1. initializes terraform and spins up a local environment (with a few base assumptions)
         - nginx ingress controller
         - tinkerpop db
   1. `npm run db:seed` from the server directory to populate the local database
      1. should detect if the DB has been seeded already and do nothing if it is already initialized
   1. `npm run build:container` for the server (concurrent with UI)
      1. build the docker container containing the server
      1. push the container to the local registry
   1. `npm run start:helm` for the server
      1. installs the server helm chart in the local environment
   1. `npm run build:container` for the UI (concurrent with server)
      1. build the docker container containing the UI
      1. push the container to the local registry
   1. `npm run start:helm` for the UI
      1. installs the UI helm chart in the local environment
      1. open a browser to the expected ingress route of the UI
   1. changes are made, tests are run locally, changes are committed and pushed
1. review
   1. merge request into master is opened
   1. CI is run for the parts of the mono repo that have had changes made
      1. container build succeeds (including app build inside of it)
      1. unit and local integratiion tests are run and pass
      1. helm chart passes `helm lint`
   1. code is reviewed
      1. all discussions must be resolved
      1. 1 non-author collaborator+ approves
      1. CI has passed
1. deploy
   1. code is merged to main
   1. CI is run on main for changed parts of the repo
   1. CD is kicked off
      1. `terraform plan -out=...` for cloud infrastructure
         - AKS cluster + node(s)
         - Cosmos DB for Gremlin Graph API
         - Application Gateway Ingress Controller installed in the AKS cluster
      1. if any infrastructure changes would be made human intervention is needed to approve the plan
      1. `terraform apply ...`
      1. CD is triggered for the parts of the repo with changes
         1. the container image built is pushed to a container registry
         1. the helm chart is pushed to a chart repository if it has been changed (newer version)
         1. `helm install` the current chart version

## Architecture

- branch based development
- IaC to source control and document infrastructure (including the CI/CD configurations)

## Technical Details

- local infrastructure should mirror cloud infrastructure closely enough that deploying to the local environment uses the same tools and commands as deploying to the cloud in CD
- local deployments should be as automated as cloud deployments so that there is no ambiguity and the deployment process is completely documented for either environment in code save for initial local setup requirements, documents in the readme
- the main branch will need to be protected to disable any direct commits to it (at least without the added step of unprotecting it in rare circumstances) and pull request policies created to enforce the rules outlined in the workflow
- [rules:changes](https://docs.gitlab.com/ee/ci/yaml/#ruleschanges) can be used to write gitlab ci rules about when a job is triggered, specifically here to have pipeline definitions for different portions of the mono repo (server and UI, as it stands now)
- start with just one node in the cluster of the smallest size possible and vertically scale up to the reach the smallest node that can run the workflow

### patterns

- branch based development: work is done in a branch off the main, stable branch. When work is ready to be integrated it is run through a review process before being merged. Releases are done from the main stable branch.
- Continuous Integration (CI): when changes are submitted to the server automatically run build and test scripts to ensure that those changes are valid and ready to be merged into the main branch
- Continuous Deployment (CD): as soon as valid code has been merged to the deployable branch(es) automatically run deployment scripts to deliver that code to a deployment environment for use/testing
- Infrastructure as Code
  - deployment is stable and repeatable because it is entirely written out as code
  - deployments can be code reviewed because they are coded
  - the deployment code documents the deployment process

### technologies / frameworks

- gitlab CI
- terraform
- Azure
- cosmosdb
- docker
- kubernetes
- helm
- npm
- tinkerpop
- chartmuseum
- registry
  - this is the name of the docker container registry image

### Security

- no secrets or credentials should be visible to a human, they should be passed through stages of CI/CD
  - e.g. the database connection string or connection information should be stored as a secret in kubernetes, obtained from terraform creating the database rather than being in source control
    - human operators may be able to gain access to the secrets or may be able to manually create new connection strings for troubleshooting however it should be the default scenario that no human ever sees (or needs to see) any application secrets and that explicit action needs to be taken to _gain_ access rather than having access and needing only to exercise that access
- no application security yet
- Azure admin will be limited to Chris Dykstra as the owner of the tenant
  - read-only access can be granted to contributors so they're not coding the IaC blind; changes to infrastructure should all be done through code changes

## Risks

- getting charged for things I didn't want to get charged for
  - if the cluster costs are still within the free tier (zero) it might be enough to simply shut off the application gateway / ingresses from the outside world so the application isn't visible until/unless those are reenabled i.e. deployed dark
- someone finding the exposed app routes and causing large usage charges by continuously running penetration scripts
  - this really happened to me for a past personal project that got deployed to Azure. It cost me almost $300. This is why it will not be left enabled once the whole pipeline is working except turning it back on in preparation for the science fair
