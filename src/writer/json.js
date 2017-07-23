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
type ConsoleLike = { log: (msg: string) => void };
export default (log: LogItem, _console: ?ConsoleLike) =>
  (_console || console).log(stringify(log));
