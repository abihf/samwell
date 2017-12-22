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

export enum Level {
  TRACE = 10,
  DEBUG = 20,
  INFO = 30,
  WARNING = 40,
  ERROR = 50,
  FATAL = 60,
}

export enum LevelString {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

export interface ILogItem {
  time: Date;
  level: LevelString;
  msg: string;
  context?: ILogItemContext | null;
}
export type Writer = (log: ILogItem) => void;

const LEVEL_MAP = {
  [Level.TRACE]: LevelString.TRACE,
  [Level.DEBUG]: LevelString.DEBUG,
  [Level.INFO]: LevelString.INFO,
  [Level.WARNING]: LevelString.WARNING,
  [Level.ERROR]: LevelString.ERROR,
  [Level.FATAL]: LevelString.FATAL,
};

const DEFAULT_MIN_LEVEL = Level.INFO;

export class Logger {
  private writer: Writer;
  private baseContext?: ILogItemContext;
  private minLevel: Level = DEFAULT_MIN_LEVEL;

  constructor(baseContext: ILogItemContext | undefined, writer: Writer) {
    this.writer = writer;
    this.baseContext = baseContext;
  }

  public createLogger(context: ILogItemContext): Logger {
    const logger = new Logger({ ...this.baseContext, ...context }, this.writer);
    logger.minLevel = this.minLevel;
    return logger;
  }

  public setWriter(writer: Writer) {
    this.writer = writer;
  }

  public getWriter() {
    return this.writer;
  }

  public setLevel(level: Level) {
    this.minLevel = level;
  }

  public getLevel() {
    return this.minLevel;
  }

  public trace(...args: any[]) {
    this.log(Level.TRACE, args);
  }

  public debug(...args: any[]) {
    this.log(Level.DEBUG, args);
  }

  public info(...args: any[]) {
    this.log(Level.INFO, args);
  }

  public warn(...args: any[]) {
    this.log(Level.WARNING, args);
  }

  public error(...args: any[]) {
    this.log(Level.ERROR, args);
  }

  public fatal(...args: any[]) {
    this.log(Level.FATAL, args);
  }

  private log(level: Level, args: any[]) {
    const time = new Date();
    if (level >= this.minLevel) {
      setTimeout(() => this.actualLog(time, LEVEL_MAP[level], args), 0);
    }
  }

  private actualLog(time: Date, level: LevelString, args: any[]) {
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
