// @flow

import colors from 'colors/safe';
import prettyjson from 'prettyjson';
import { normalizeLogError } from '../error';
import type { LogItem } from '../logger';

module.exports = (log: LogItem, _console: Console) => {
  normalizeLogError(log);

  const time = colors.bgBlue.white(log.time.toISOString());
  let level = '';
  switch (log.level) {
    case 'debug':
      level = colors.bgWhite.green(' DEBUG:');
      break;
    case 'info':
      level = colors.bgWhite.blue(' INFO:');
      break;
    case 'warn':
      level = colors.bgWhite.yellow(' WARNING:');
      break;
    case 'error':
      level = colors.bgWhite.red(' ERROR:');
      break;
    default:
      level = colors.bgWhite.cyan(' UNKNOWN:');
      break;
  }

  const context =
    log.context &&
    prettyjson
      .render(log.context)
      .split('\n')
      .map(line => `  ${line}`)
      .join('\n');

  (_console || console)
    .log(`${time}${level} ${log.msg}${context ? '\n' : ''}${context}`);
};
