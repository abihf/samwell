import { ILogItem } from '../logger';

export default (log: ILogItem, customConsole?: any) =>
  (customConsole || console)[log.level](log.msg, log.context);
