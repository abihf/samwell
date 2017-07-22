// @flow

import type { LogItem } from './logger';

export type ErrorDefinition = {
  name: string,
  message: string,
  stack: string[],
};

export function errorToObject(err: Error): ErrorDefinition {
  return {
    name: err.name,
    message: err.message,
    stack: err.stack.split('\n').slice(1).map(line => line.replace(/^\s+/, '')),
  };
}

export function normalizeLogError(log: LogItem) {
  if (log.context && log.context.err && log.context.err instanceof Error) {
    log.context = Object.assign({}, log.context, {
      err: errorToObject(log.context.err),
    });
  }
}
