import { Container, Scope } from 'typescript-ioc';
import { ApiServer } from './api.server';
import registerEnv from './config/env';
import { BaseDbConnector } from './framework/infra/database/base.db';
import { GraphQLServer } from './graphql.server';
import { MySqlConnector } from './infra/database/mysql.db';
import setupServer from './server';


const setupIoC = () => {
  registerEnv();

  Container.bind(BaseDbConnector).to(MySqlConnector).scope(Scope.Singleton);
  Container.bind(ApiServer).scope(Scope.Singleton);
  Container.bind(GraphQLServer).scope(Scope.Singleton);
  Container.bindName('app').to(setupServer());
};

const start = async () => {
  setupIoC();

  const connector = Container.get(MySqlConnector);
  await connector.connect();
    
  const api: ApiServer = Container.get(ApiServer);
  const gql = Container.get(GraphQLServer);
  await gql.start();
  await api.start();
};

try {
  start();
} catch (err) {
  console.error(`Error starting server: ${err.message}`);
  process.exit(-1);
}