import { process as gremlinProcess, driver } from 'gremlin';

const {
  AnonymousTraversalSource: { traversal },
} = gremlinProcess;
const { DriverRemoteConnection } = driver;

export type Transaction = gremlinProcess.Transaction<gremlinProcess.GraphTraversalSource<gremlinProcess.GraphTraversal>>;

export const graph = traversal().withRemote(
  new DriverRemoteConnection(process.env.npm_package_config_db),
);