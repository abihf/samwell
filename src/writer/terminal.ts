import * as colors from 'colors/safe';
import * as prettyjson from 'prettyjson';
import { normalizeLogError } from '../error';
import { ILogItem } from '../logger';
import { LevelString } from '../logger';

export default  (dirtyLog: ILogItem) => {
  if (
    dirtyLog.level === 'debug' &&
    !process.env.DEBUG &&
    !process.env.SAMWELL_DEBUG
  ) {
    return;
  }

  const log: ILogItem = normalizeLogError(dirtyLog);
  const timeString = formatTime(log.time);
  let prefix: string;
  switch (log.level) {
    case LevelString.TRACE:
      prefix = colors.grey(`[${timeString} ${colors.bold('TRC')}]`);
      break;
    case LevelString.DEBUG:
      prefix = colors.cyan(`[${timeString} ${colors.bold('DBG')}]`);
      break;
    case LevelString.INFO:
      prefix = colors.blue(`[${timeString} ${colors.bold('INF')}]`);
      break;
    case LevelString.WARNING:
      prefix = colors.yellow(`[${timeString} ${colors.bold('WRN')}]`);
      break;
    case LevelString.ERROR:
      prefix = colors.red(`[${timeString} ${colors.bold('ERR')}]`);
      break;
    case LevelString.FATAL:
      prefix = colors.magenta(`[${timeString} ${colors.bold('FTL')}]`);
      break;
    default:
      prefix = `[${timeString} ???]`;
  }

  // tslint:disable-next-line:no-console
  console.log(`${prefix} ${log.msg}`);
  if (log.context) {
    prettyjson.render(log.context, {keysColor: 'grey'})
      .split('\n')
      // tslint:disable-next-line:no-console
      .map((line) => console.log(`  ${line}`));
  }
};

function formatTime(t: Date): string {
  return [
    padNumber(t.getHours(), 2),
    padNumber(t.getMinutes(), 2),
    padNumber(t.getSeconds(), 2),
    padNumber(t.getMilliseconds(), 3),
  ].join(':');
}

function padNumber(n: any, len: number) {
  return Array(len - String(n).length + 1).join('0') + n;
}
