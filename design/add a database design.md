# Adding a Database

### a graph database

## Elevator Pitch

In order to not require any change to the skills matrix data to be a change to the code and a deployment add a database to store the data. This will also allow the skills matrix to be used by non-nvisia companies i.e. make this something that could be sold once polished.

## Assumptions

- there is a graph database in a docker container for easy fiddling and learning
  - sepcifically one that implements the Gremlin API so that a database can be run locally that uses the same API as Cosmos and Neptune
- using the Gremlin API against whatever is used locally will work the same as it will when used with Cosmos or Neptune
- the data will fit well into a graphdb
  - the important parts of the domain model are the relationships
  - the focus of a graph database is on the rela

## Workflow

1. load the object tree from the prototype into the database using the Gremlin API
1. when the page loads fetch the object graph from the database using the Gremlin API

## Architecture

same underlying architecture.
add a database and a ReST API server to access it
keep everything in typescript for now

### Domain Model

no changes

## Technical Details

- the Gremlin API is supported by both Cosmos and Neptune as well as Tinkerpop, which has a docker container
- a server needs to be introduced (or polyfills) because the browser does not, by default, contain the necessary library code to run the gremlin API... and a browser shouldn't be allowed to directly access a database anyways
- Gremlin documentation from Apache is available online
  - it seems to not be 100% accurate
- try to get the UI and the API to both start up from one command
  - try to get starting the database to be spelled out in code and in as few commands as possible (documentation and aid in one)

### patterns

- ReST

### technologies / frameworks

- nestJS for the server
  - use the OpenAPI package to generate an OAS3 spec and swagger UI
- openapitools on the front end to generate the client used to access the backend

### API Surface

- GET /titles => minimal data for a title + link to the full title details
- GET /titles/:id => the full details of one title
  - avoids circular serialization and allows lazy navigating of the tree, if desired

### Security

same as before, none other than code access
