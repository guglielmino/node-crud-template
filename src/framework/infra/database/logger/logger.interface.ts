export abstract class ILogger {

  abstract log(message: string): void;
  abstract debug(message: string): void;
  abstract error(message: string): void;
  abstract info(message: string): void;

}