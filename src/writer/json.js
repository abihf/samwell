// @flow

import safeJsonStringify from 'safe-json-stringify';
import { normalizeLogError } from '../error';

import type { LogItem } from '../logger';

function stringify(obj: LogItem): string {
  normalizeLogError(obj);
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return safeJsonStringify(obj);
  }
}

module.exports = (log: LogItem, _console: any) =>
  (_console || console).log(stringify(log));
