// @flow

const safeJsonStringify = require('safe-json-stringify')

/*::
import type {LogItem, LogItemContext} from '../logger'; 
*/

function stringify (obj /*: LogItem */) /*: string */ {
  console.log(obj.lala);
  try {
    return JSON.stringify(obj)
  } catch (e) {
    return safeJsonStringify(obj)
  }
}

module.exports = (log /*: LogItem */) => console.log(stringify(log))
