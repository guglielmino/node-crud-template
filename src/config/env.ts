import { Container } from 'typescript-ioc';

const missing: string[] = [];

const envOrDefault = (env: string, defaultValue = '', required = true): string => {
  if (!process.env[env] && required) {
    missing.push(env);
  }
  return process.env[env] || defaultValue;
};

export interface IServerConfig {
  port: number;
  host: string;
  jwtSecret: string;
}

export interface IDatabaseConfig {
  type: string;
  connectionString: string,
}

export interface IEnv {
  release: string;
  environment: string;
  database: IDatabaseConfig;
  server: IServerConfig;
}

const registerEnv = (): void => {
  Container.bindName('config').to({
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    release: require('../../package.json').version,
    environment: envOrDefault('NODE_ENV', 'development', false),
    server: {
      port: +envOrDefault('PORT', '8080', false),
      host: envOrDefault('HOST', '0.0.0.0', false),
      jwtSecret: envOrDefault('JWT_SECRET', '', true)
    },
    database: {
      type: envOrDefault('DB_TYPE', '', true),
      connectionString:  envOrDefault('CONNECTION_STRING', '', true)
    }
  });
};

export default registerEnv;