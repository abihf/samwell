// @flow

import type { LogItem } from '../logger';

type MultiLevelConsoleLike = { [level: string]: (...args: any) => void };

export default (log: LogItem, _console: ?MultiLevelConsoleLike) =>
  (_console || console)[log.level](log.msg, log.context);
