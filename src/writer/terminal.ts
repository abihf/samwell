import * as colors from 'colors/safe';
import * as prettyjson from 'prettyjson';
import { normalizeLogError } from '../error';
import { ILogItem } from '../logger';

export default  (dirtyLog: ILogItem) => {
  const log: ILogItem = normalizeLogError(dirtyLog);

  const time: string = colors.bgBlue.white(log.time.toISOString());
  let level: string = '';
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
      .map((line) => `  ${line}`)
      .join('\n');

  // tslint:disable-next-line:no-console
  console.log(`${time}${level} ${log.msg}${context ? '\n' : ''}${context || ''}`);
};
