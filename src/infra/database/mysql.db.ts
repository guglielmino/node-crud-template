import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { IDatabaseConfig } from '../../config/env';
import { BaseDbConnector } from '../../framework/infra/database/base.db';
import * as path from 'path';
import { InjectValue, Singleton } from 'typescript-ioc';

@Singleton
export class MySqlConnector implements BaseDbConnector {

  private static mySqlConnection: Connection;

  constructor(@InjectValue('config.database') private config: IDatabaseConfig) {
    this.config = config;
  }

  get connection(): Connection {
    return MySqlConnector.mySqlConnection;
  }

  public async connect(): Promise<any> {
    const options: ConnectionOptions = {
      type: 'mysql',
      synchronize: true,
      url: this.config.connectionString,
      entities: [
        path.join(__dirname, '../../models/*.model.ts')
      ]
    };
    const connection = await createConnection(options);
    MySqlConnector.mySqlConnection = connection;
  }

  public async disconnect(): Promise<any> {
    return MySqlConnector.mySqlConnection.close();
  }

}
