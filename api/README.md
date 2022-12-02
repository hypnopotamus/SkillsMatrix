<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# Database

This application uses a graph database through the Gremlin API

## Running Locally

`npm run db:local:start` will pull and start a TinkerPop docker image that the default configuration is already set up to connect to

## Default Data

`npm run db:seed` will fill use the application configuration to connect to a graph db (so long as it supports the Gremlin API it does not necessarily need to be the local TinkerPop server). It will take the default nvisia skills matrix object graph and store the data in the graph database as a starting point.

## Prod Deployment

currently CI is not set up to fully automate these steps

#### push the image

using the current package.json version (assuming the container has been built locally)
`docker image tag skillsmatrix/api techshowcaseskillsmatrix.azurecr.io/skillsmatrix/api`
`docker image tag skillsmatrix/api:1.1.1 techshowcaseskillsmatrix.azurecr.io/skillsmatrix/api:1.1.1`
`docker login techshowcaseskillsmatrix.azurecr.io`
`docker image push techshowcaseskillsmatrix.azurecr.io/skillsmatrix/api`
`docker image push techshowcaseskillsmatrix.azurecr.io/skillsmatrix/api:1.1.1`

### apply the helm chart

`helm upgrade --install skillsmatrix-api oci://localhost:5000/skillsmatrix-api --version 1.1.1 --set image.host=techshowcaseskillsmatrix.azurecr.io,image.name=skills-matrix/api,image.tag=1.1.1,db.route=skillsmatrix-database.default.svc.cluster.local`
`kubectl edit ing skillsmatrix-api` and remove the `host: localhost`, `kubectl get ing` should show the host as \*. This workaround is to overcome setting via commandline only the host as \* removing the rest of the ingress block

### seed the database

if you need to
`kubectl apply -f .src\data\seed-data\seed-job.yaml`

it should complete very quickly
