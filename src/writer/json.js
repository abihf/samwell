// @flow

import safeJsonStringify from 'safe-json-stringify';
import { normalizeLogError } from '../error';

import type { LogItem } from '../logger';

function stringify(obj: LogItem): string {
  const normalized = normalizeLogError(obj);
  try {
    return JSON.stringify(normalized);
  } catch (e) {
    return safeJsonStringify(normalized);
  }
}

module.exports = (log: LogItem, _console: any) =>
  (_console || console).log(stringify(log));
