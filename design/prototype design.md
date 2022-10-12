# nvisia Skills Matrix

### not in a spreadsheet

## Elevator Pitch

The information in the skills matrix is useful to have and difficult to consume from the current spreadsheet. Separating the data storage from the presentation will allow it to be presented differently depending on the consumer. Arranging the storage into an object hierarchy will make it easier to maintain because the data is naturally centered on relationships between points.

## Assumptions

- it will be easier to comprehend the skills matrix data given one or more different presentations of it
  - specifically it will be easier for me to compare one skill level to the next for mentorship of my team mates on the upcoming NM project
- it is possible to arrange the data into an object graph
- there is no specific reason the data needs to be sourced from a spreadsheet
- there isn't anything in the skills matrix that cannot be on Github

## Workflow

### prototype

1. go to the page
1. start typing the "from" title
1. pick a "from" title
1. select the title to compare to
1. compare the skill level table

## Architecture

The emphasis (for now) seems to be on data and relationships. There is a domain model but the objects have no behavior, only properties. The abstractions of domain concepts should exist and then simply be filled by data objects mapped into the nvisia graph structure.

### Domain Model

- skill category
- skill level
- title
- track (enum)

## Technical Details

- map the skills matrix data into the domain model
- map the resulting concrete objects into a graph
  - static code for now; changes to the skills matrix data means changes to the code

### technologies / frameworks

- typescript
- react
  - create-react-app for fast start
    - planning to eject later because CRA can quickly become a huge hassle
  - material UI; let someone else do all the fiddly UI work

### API Surface

none, everything is in the react app

### Security

access to the code is the only security control.

The application will have no security in place for this prototype
