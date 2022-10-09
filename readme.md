# Summary

in the server directory is the backend, a nest.js rest API backed by a graph DB using a gremnlin API

in the UI directory you'll find the front end, a material UI react app that presents the data from the server ReST API

# Running

`npm start` from this directory will start both UI and server
you may need to manually install packages (`npm i`) in subprojects...

`npm run db:local:start` from the server directory will create a local docker container for a local TinkerPop graph DB
`npm run db:seed` from the server directory will seed the database with the default nvisia skills matrix object graph
