import { process, driver } from 'gremlin';

const {
  AnonymousTraversalSource: { traversal },
} = process;
const { DriverRemoteConnection } = driver;

export type Transaction = process.Transaction<process.GraphTraversalSource<process.GraphTraversal>>;

export const graph = traversal().withRemote(
  new DriverRemoteConnection('ws://localhost:8182/gremlin'),
);
