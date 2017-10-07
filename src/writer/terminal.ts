import * as colors from 'colors/safe';
import * as prettyjson from 'prettyjson';
import { normalizeLogError } from '../error';
import { ILogItem } from '../logger';

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
    case 'debug':
      prefix = colors.cyan(`[${timeString} ${colors.bold('DBG')}]`);
      break;
    case 'info':
      prefix = colors.blue(`[${timeString} ${colors.bold('INF')}]`);
      break;
    case 'warn':
      prefix = colors.yellow(`[${timeString} ${colors.bold('WRN')}]`);
      break;
    case 'error':
      prefix = colors.red(`[${timeString} ${colors.bold('ERR')}]`);
      break;
      default:
      prefix = `[${timeString} ???]`;
  }

  const context =
    log.context &&
    prettyjson
      .render(log.context, {keysColor: 'grey'})
      .split('\n')
      .map((line) => `  ${line}`)
      .join('\n');

  // tslint:disable-next-line:no-console
  console.log(`${prefix} ${log.msg}${context ? `\n${context}` : ''}`);
};

function formatTime(t: Date): string {
  return [
    padString(t.getHours(), 2),
    padString(t.getMinutes(), 2),
    padString(t.getSeconds(), 2),
    padString(t.getMilliseconds(), 3),
  ].join(':');
}

function padString(str: any, len: number, pad: string = '0') {
  return Array(len - String(str).length + 1).join(pad) + str;
}
