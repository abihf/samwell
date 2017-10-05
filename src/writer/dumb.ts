import { ILogItem } from '../logger';

export default (log: ILogItem) =>
  log.level !== 'debug' && console[log.level](log.msg, log.context);
