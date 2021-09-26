import * as express from 'express';
import { Server } from 'typescript-rest';

const setupApi = (app: express.Application): void  => {
  Server.loadServices(app, 'presentation/rest/controllers/*.controller.ts', __dirname);
  Server.swagger(app, { filePath: './dist/swagger.json' });
};

export default setupApi;

