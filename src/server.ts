import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';


const setupServer = (): express.Application => {
  const app: express.Application = express();

  app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
  app.use(cors());
  app.use(morgan('combined'));

  return app;
};

export default setupServer;
