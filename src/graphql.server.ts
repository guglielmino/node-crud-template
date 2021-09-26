import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { Inject } from 'typescript-ioc';
import { ExpressServer } from './express.server';
import getAllModulesSchema from './presentation/graphql/modules';

export class GraphQLServer {

  private app: express.Application;
  private server: ApolloServer;

  constructor(
    @Inject private expressServer: ExpressServer
  ) {
    this.app = this.expressServer.app;

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