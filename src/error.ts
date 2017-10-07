import { ILogItem, INormalizedError } from './logger';

export function errorToObject(err: Error): INormalizedError {
  return {
    message: err.message,
    name: err.name,
    stack: err.stack
      ? err.stack.split('\n').slice(1).map((line) => line.trim())
      : [],
  };
}

export function normalizeLogError(log: ILogItem): ILogItem {
  if (log.context && log.context.err && log.context.err instanceof Error) {
    const context = {
      ...log.context,
      err: errorToObject(log.context.err),
    };
    return {...log, context };
  }
  return log;
}
