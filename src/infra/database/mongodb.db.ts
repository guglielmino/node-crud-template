import * as mongoose from 'mongoose';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { IDatabaseConfig } from '../../config/env';
import * as path from 'path';
import { InjectValue } from 'typescript-ioc';

export class MongoDbConnector {

  private static mongoConnection: Connection;

  constructor(@InjectValue('config.database') private config: IDatabaseConfig) {
    this.config = config;
  }

  get connection(): Connection {
    return MongoDbConnector.mongoConnection;
  }

  public async connect(): Promise<any> {
    const options: ConnectionOptions = {
      type: 'mongodb',
      useNewUrlParser: true,
      authSource: 'admin',
      url: this.config.connectionString,
      logging: ['error', 'query', 'error'],
      entities: [
        path.join(__dirname, '../../models/*.model.ts')
      ]
    };
    const connection = await createConnection(options);
    MongoDbConnector.mongoConnection = connection;
  }

  public async disconnect(): Promise<any> {
    return mongoose.connection.close();
  }

}
