// @flow

import util from 'util';

export type LogArg = string | number | boolean | null | Error | {
  [name: string]: any,
  err?: Error,
};
export type logFunction = (...args: LogArg[]) => void;

export type LogItemContext = {
  [name: string]: any,
  err?: Error,
};

export type LogItem = {
  time: Date,
  level: string,
  msg: string,
  context: ?LogItemContext,
}
export type Writer = (log: LogItem) => void;


export class Logger {
  debug: logFunction;
  info: logFunction;
  warn: logFunction;
  error: logFunction;

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

  log(level, message, messageArgs, _context) {
    var args = [].slice.call(arguments, 1)

    var context: any = null;
    if (typeof args[args.length - 1] === 'object') {
      context = args.pop();
    }

    var error: ?Error = null;
    var realContext: ?LogItemContext = null;
    if (context instanceof Error) {
      error = context
      realContext = { err: error };
    } else {
      realContext = context;
    }

    if (this.baseContext) {
      realContext = Object.assign(this.baseContext, realContext);
    }

    var msg = '';
    if (args.length === 1) {
      msg = args[0];
    } else if (args.length == 0 && error) {
      msg = error.message;
    } else {
      msg = util.format.apply(null, args);
    }

    if (this.writer) {
      this.writer({
        time: new Date(),
        level: level,
        msg: msg,
        context: realContext,
      });
    }
  }

  createChild(context) {
    return new Logger(Object.assign({}, this.baseContext, context), this.writer)
  }
}