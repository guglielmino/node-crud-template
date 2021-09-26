import { Container, Scope } from 'typescript-ioc';
import setupApi from './rest.setup';
import registerEnv from './config/env';
import { ExpressServer } from './express.server';
import { BaseDbConnector } from './framework/infra/database/base.db';
import { GraphQLServer } from './graphql.server';
import { MySqlConnector } from './infra/database/mysql.db';


const setupIoC = () => {
  registerEnv();

  // Define the Database Implementation to use
  Container.bind(BaseDbConnector).to(MySqlConnector).scope(Scope.Singleton);
  Container.bind(GraphQLServer).scope(Scope.Singleton);
  Container.bind(ExpressServer).scope(Scope.Singleton);
};

const start = async () => {
  setupIoC();

  const connector = Container.get(BaseDbConnector);
  await connector.connect();

  const appServer = Container.get(ExpressServer);

  setupApi(appServer.app);
  const gql = Container.get(GraphQLServer);
  await gql.start();

  await appServer.start();
};

try {
  start();
} catch (err) {
  console.error(`Error starting server: ${err.message}`);
  process.exit(-1);
}