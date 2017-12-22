import { ILogItem, LevelString } from '../logger';
type ConsoleMethod = 'log' | 'info' | 'warn' | 'error';

export const LEVEL_METHOD_MAP = {
  [LevelString.TRACE]: 'log' as ConsoleMethod,
  [LevelString.DEBUG]: 'log' as ConsoleMethod,
  [LevelString.INFO]: 'info' as ConsoleMethod,
  [LevelString.WARNING]: 'warn' as ConsoleMethod,
  [LevelString.ERROR]: 'error' as ConsoleMethod,
  [LevelString.FATAL]: 'error' as ConsoleMethod,
};

export default (log: ILogItem) =>
  console[LEVEL_METHOD_MAP[log.level]](log.msg, log.context);
