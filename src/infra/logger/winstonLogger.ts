import * as winston from 'winston';
import { ILogger } from '../../framework/infra/database/logger/logger.interface';

class WinstonLogger implements ILogger {

  logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
      ]
    });
  }

  log(message: string): void {
    this.logger.log({ message, level: 'info' });
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

}

export default WinstonLogger;