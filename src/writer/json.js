// @flow

import safeJsonStringify from 'safe-json-stringify';
import { normalizeLogError } from '../error';

import type {LogItem, LogItemContext} from '../logger'; 

function stringify (obj: LogItem): string {
  normalizeLogError(obj);
  try {
    return JSON.stringify(obj)
  } catch (e) {
    return safeJsonStringify(obj)
  }
}

module.exports = (log: LogItem) => console.log(stringify(log))
