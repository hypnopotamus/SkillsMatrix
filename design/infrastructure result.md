# Skills Matrix

### infrastructure, CI/CD, basic devops

[original design](./infrastructure.md): use Infrastructure as Code tools to deploy code locally to an environment as much like a production environment as possible. Making the local environment to be used like and run like the production environment will increase stability of both.

## Result: Success

The transition from a local environment to a cloud hosted environment was smooth and worked as expected. The work to transition from local-only was almost entirely contained in provisioning the cloud environment, deploying code to the new environment using the same tools as the local environment was already using worked well.

## Lessons Learned

- many local changes and iterations might be needed before a single version increase is published
  - the core concept that code changes must be accompanied by a version increase is sound however the requirement for local development needs to be slackened to allow the same version to be built with new changes locally so long as that version is higher than the highest published version
  - the most common workaround for this problem was restarting the local infrastructure to empty it and start fresh... less than ideal
- using the same tools for local development as for non-local deployment requires team members to have at least some understanding of the deployment tools and environment
  - this is both positive and negative; it creates a barrier for onboarding team members that are not already familiar with the additional tools and it also necessitates that there is at least a basic understanding of how the code is deployed reducing the chance of error after local development
- onboarding a new team member while automation of the local environment is partially finished proved to be a major blocker for the new team member
  - debugging errors was difficult
  - cross platform automation was more difficult than perhaps it should have been
    - notably: docker for Mac and docker for Windows are different in some ways that proved to be very important
  - the short time frame for onboarding was a major factor in how much of a problem this really was

## See the Code

- [build automation](../buildScripts/src/) this directory contains automation scripts for building, publishing, and running local code artifacts
- [local infrastructure](../infrastructure/local/) this directory contains the local infrastucture code, [docker-compose.yml](../infrastructure/local/docker-compose.yml) starts an OCI container registry, a local NPM package registry, and a local database while [cluster/main.tf](../infrastructure/local/cluster/main.tf) uses terraform to ensure the local kubernetes cluster has the necessary prerequisites installed and running
- [production infrastructure](../infrastructure/prod/) this directory contains the production infrastucture code. [main.tf](../infrastructure/prod/main.tf) is the entry point using terraform to provision an environment in Azure with the same capabilities as the local environment with the addition of application monitoring and Azure managed Role Based Access Control (RBAC) between hosted services
- [helm](https://helm.sh/) charts are used to define application deployments, both locally and for production, e.g. for the ReST API[chart]](../api/chart/). The helm chart gives the kubernetes cluster instructions on which container to run, how to run it, how many copies, etc.
- [docker](https://www.docker.com/) files are used to containerize the applications, providing an environment that remains constant (as far as the application is concerned) regardless of where it is executing e.g. for the ReST API[dockerfile](../api/dockerfile)
