// @flow

import type { LogItem } from '../logger';

module.exports = (log: LogItem, _console: any) =>
  (_console || console)[log.level](log.msg, log.context);
