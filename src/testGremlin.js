const gremlin = require("gremlin");

//todo delete this
//todo need to add a backend because the browser can't connect directly to the db (even on the same machine)
//missing Stream
const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const { cardinality: { single } } = gremlin.process;

const g = traversal().withRemote(new DriverRemoteConnection('ws://localhost:8182/gremlin'));

g.addV(`time: ${new Date()}`)
  .property(single, 'name', new Date().toISOString())
  .next()

g.V().toList().then(l => console.log(l))