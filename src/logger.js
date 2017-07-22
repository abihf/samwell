// @flow

import util from 'util';

export type LogArg =
  | string
  | number
  | bool
  | null
  | Error
  | {
      [name: string]: any,
      err?: Error,
    };
export type LogFunction = (...args: LogArg[]) => void;

export type LogItemContext = {
  [name: string]: any,
  err?: Error,
};

export type LogItem = {
  time: Date,
  level: string,
  msg: string,
  context: ?LogItemContext,
};
export type Writer = (log: LogItem) => void;

export class Logger {
  debug: LogFunction;
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;

  writer: ?Writer;
  baseContext: ?LogItemContext;

  constructor(baseContext: ?LogItemContext, writer: ?Writer) {
    this.writer = writer;
    this.baseContext = baseContext;

    this.debug = this.log.bind(this, 'debug');
    this.info = this.log.bind(this, 'info');
    this.warn = this.log.bind(this, 'warn');
    this.error = this.log.bind(this, 'error');
  }

  log(level: string, ...args: LogArg[]) {
    let context: any = null;
    if (typeof args[args.length - 1] === 'object') {
      context = args.pop();
    }

    let error: ?Error = null;
    let realContext: ?LogItemContext = null;
    if (context instanceof Error) {
      error = context;
      realContext = { err: error };
    } else {
      realContext = context;
    }

    if (this.baseContext) {
      realContext = Object.assign({}, this.baseContext, realContext);
    }

    let msg = '';
    if (args.length === 1) {
      msg = args[0];
    } else if (args.length === 0 && error) {
      msg = error.message;
    } else {
      msg = util.format.apply(null, args);
    }

    if (this.writer) {
      this.writer({
        time: new Date(),
        level,
        msg,
        context: realContext,
      });
    }
  }

  createChild(context: LogItemContext) {
    return new Logger(
      Object.assign({}, this.baseContext, context),
      this.writer
    );
  }
}
