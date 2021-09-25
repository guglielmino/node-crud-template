import * as express from 'express';
import * as http from 'http';
import { InjectValue, Singleton } from 'typescript-ioc';
import {  Server } from 'typescript-rest';
import { IServerConfig } from './config/env';

@Singleton
export class ApiServer {

  private server: http.Server = null;

  constructor(
    @InjectValue('config.server') private config: IServerConfig,
    @InjectValue('app') private app: express.Application
  ) {
    this.app = app;

    Server.loadServices(this.app, 'presentation/rest/controllers/*');
    Server.swagger(this.app, { filePath: './dist/swagger.json' });
  }

  public async start(): Promise<void> {
    this.server = await this.app.listen(this.config.port);
    console.log(`Listening to http://127.0.0.1:${this.config.port}`);
  }

  public async stop(): Promise<void> {
    if (this.server) {
      await this.server.close();
    }
  }

}