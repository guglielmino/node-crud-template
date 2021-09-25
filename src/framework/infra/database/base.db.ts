import { Connection } from 'typeorm';

export abstract class BaseDbConnector {

  abstract get connection(): Connection;
  abstract connect(): Promise<any>;
  abstract disconnect(): Promise<any>;

}