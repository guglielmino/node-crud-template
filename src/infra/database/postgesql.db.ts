import * as path from 'path';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { InjectValue, Singleton } from 'typescript-ioc';
import { IDatabaseConfig } from '../../config/env';
import { BaseDbConnector } from '../../framework/infra/database/base.db';


@Singleton
export class PostgeSQLConnector implements BaseDbConnector {

  private static postgreSQLConnection: Connection;

  constructor(@InjectValue('config.database') private config: IDatabaseConfig) {
    this.config = config;
  }

  get connection(): Connection {
    return PostgeSQLConnector.postgreSQLConnection;
  }

  public async connect(): Promise<any> {
    const options: ConnectionOptions = {
      type: 'postgres',
      synchronize: true,
      url: this.config.connectionString,
      entities: [
        path.join(__dirname, '../../models/*.model.ts')
      ]
    };
    const connection = await createConnection(options);
    PostgeSQLConnector.postgreSQLConnection = connection;
  }

  public async disconnect(): Promise<any> {
    return PostgeSQLConnector.postgreSQLConnection.close();
  }

}
