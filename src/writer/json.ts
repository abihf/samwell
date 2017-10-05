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

export default (log: ILogItem, customConsole?: any) =>
  (customConsole || console).log(stringify(log));
