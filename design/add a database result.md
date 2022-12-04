# Adding a Database

[original design](./add%20a%20database%20design.md): The data in the original spreadsheet was shaped in a way that naturally lent itself to being in a tree format. A tree, being a subset of a graph, fit well with a graph database as the storage engine.

## Result: Partial Success

While it was successful to store the application data in a graph database Cosmos DB lack of full support of a Gremlin API meant that it a transition from Tinkerpop Gremlin Server to Cosmos was not directly possible.

## Original Assumptions

- there is a graph database in a docker container for easy fiddling and learning
  - turned out to be true, Tinkerpop Gremlin Server
- using the Gremlin API against whatever is used locally will work the same as it will when used with Cosmos or Neptune
  - this turned out _NOT_ to be true. Cosmos only has a partial gremlin API, it does not support the fluent API, which Apache (Gremlin API publisher and maintainer) recommends over the legacy "client.submit" API
  - pivot: Tinkerpop Gremlin Server is being used both locally and in production as an in-memory database
    - this met the needs for an MVP
    - the lack of durability will be a problem in the long term
- the data will fit well into a graphdb
  - turned out to be true
  - having bidirectional relationships transmitted through a ReST API necessitated some workarounds
  - data size scaling will require some performance tuning

## Lessons Learned

- the typescript definitions for the Gremlin API leave something to be desired
- the Apache documentation on Gremlin is not quite correct in many places, at least for the javascript implementation
- Cosmos, while it advertises a Gremlin API, does not fully support it and development efforts seem to have been abandoned on further progress or completeness

## See the Code

- [titles/seed.ts](../api/src/data/seed-data/titles/seed.ts) is an example of writing graph data from objects
- [TitleRepository.ts](../api/src/data/TitleRepository.ts) is an example of accessing graph data and turning it back into objects
