import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { InjectValue } from 'typescript-ioc';
import getAllModulesSchema from './presentation/graphql/modules';

export class GraphQLServer {

  private server: ApolloServer;

  constructor(
    @InjectValue('app') private app: express.Application
  ) {
    this.app = app;

    this.server = new ApolloServer({
      schema: getAllModulesSchema()
    });
  }

  public async start(): Promise<void> {
    await this.server.start();
    this.server.applyMiddleware({ app: this.app, path: '/graphql' });
  }

  public async stop(): Promise<void> {
    this.server.stop();
  }

}