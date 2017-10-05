import * as safeJsonStringify from 'safe-json-stringify';
import { normalizeLogError } from '../error';
import { ILogItem } from '../logger';

function stringify(obj: ILogItem): string {
  const normalized = normalizeLogError(obj);
  try {
    return JSON.stringify(normalized);
  } catch (e) {
    return safeJsonStringify(normalized);
  }
}

// tslint:disable-next-line:no-console
export default (log: ILogItem) =>  console.log(stringify(log));
