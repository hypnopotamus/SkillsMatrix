import { Controller, Post } from '@nestjs/common';
import { process, driver } from 'gremlin';

const {
  AnonymousTraversalSource: { traversal },
  cardinality: { single },
} = process;
const { DriverRemoteConnection } = driver;

@Controller()
export class AppController {
  @Post()
  //todo actually use gremlin, not just test it
  //todo swagger UI
  async testGremlin(): Promise<process.Traverser[]> {
    const graph = traversal().withRemote(
      new DriverRemoteConnection('ws://localhost:8182/gremlin'),
    );

    await graph
      .addV(`time: ${new Date()}`)
      .property(single, 'name', new Date().toISOString())
      .next();

    return await graph.V().toList();
  }
}
