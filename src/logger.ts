export interface ILogItemContext {
  [name: string]: any;
  err?: Error | INormalizedError;
}

export interface INormalizedError {
  name: string;
  message: string;
  stack: string[];
}

export type LogFunction = (...args: any[]) => void;

export interface ILogItem {
  time: Date;
  level: string;
  msg: string;
  context?: ILogItemContext | null;
}
export type Writer = (log: ILogItem) => void;

export class Logger {
  public debug: LogFunction;
  public info: LogFunction;
  public warn: LogFunction;
  public error: LogFunction;

  public writer: Writer;
  public baseContext?: ILogItemContext;

  constructor(baseContext: ILogItemContext | undefined, writer: Writer) {
    this.writer = writer;
    this.baseContext = baseContext;

    this.debug = this.log.bind(this, 'debug');
    this.info = this.log.bind(this, 'info');
    this.warn = this.log.bind(this, 'warn');
    this.error = this.log.bind(this, 'error');
  }

  public createChild(context: ILogItemContext): Logger {
    return new Logger({ ...this.baseContext, ...context }, this.writer);
  }

  private log(level: string, ...args: any[]) {
    const time = new Date();
    setTimeout(() => this.actualLog(time, level, args), 0);
  }

  private actualLog(time: Date, level: string, args: any[]) {
    let context: ILogItemContext | Error | undefined;
    if (typeof args[args.length - 1] === 'object') {
      context = args.pop();
    }

    let error: Error | undefined;
    let realContext: ILogItemContext | undefined;
    if (context instanceof Error) {
      error = context;
      realContext = { err: error };
    } else {
      realContext = context;
    }

    if (this.baseContext) {
      realContext = { ...this.baseContext, ...realContext };
    }

    let msg: string = '';
    switch (args.length) {
      case 0:
        if (error) {
          msg = error.message;
        } else {
          realContext = { err: new Error('Logger has been called without message') };
        }
        break;
      case 1:
        msg = args[0];
        break;
      default:
        msg = formatString(args[0], args.slice(1));
    }

    /* tslint:disable:object-literal-sort-keys */
    this.writer({
      time,
      level,
      msg,
      context: realContext,
    });
    /* tslint:enable:object-literal-sort-keys */
  }
}

function formatString(format: string, args: any[]) {
  return (
    format &&
    format.replace(
      /{(\d+)}/g,
      (match, index) =>
        typeof args[index] !== 'undefined' ? args[index] : match,
    )
  );
}
