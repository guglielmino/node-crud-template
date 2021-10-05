import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';

import * as morgan from 'morgan';
import {  InjectValue } from 'typescript-ioc';
import { IServerConfig } from './config/env';

export class ExpressServer {

  private server: http.Server = null;
  public app: express.Application;

  constructor(
    @InjectValue('config.server') private config: IServerConfig
  ) {
    this.app = express();
    this.app.use(cors());
    this.app.use(morgan('combined'));
  }

  public async start(): Promise<void> {
    const httpServer = new http.Server(this.app);
    this.server = httpServer.listen(this.config.port, this.config.host);

    console.log(`Listening to http://${this.config.host}:${this.config.port}`);
  }

  public async stop(): Promise<void> {
    if (this.server) {
      this.server.close();
    }
  }

}