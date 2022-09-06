import { Controller, Post } from '@nestjs/common';
import { process } from 'gremlin';
import { graph } from './data/gremlin';

@Controller()
export class AppController {
  @Post()
  //todo delete this, replace with an API that returns the objects stored in the graphdb
  async testGremlin(): Promise<process.Traverser[]> {
    return await graph.V(1).properties().toList();
  }
}
