// @flow

import colors from 'colors/safe';
const prettyjson = require('prettyjson')

import type { LogItem } from '../logger'; 

module.exports = (log: LogItem, _console: Console) => {
  var time = colors.bgBlue.white(log.time.toISOString())
  var level = ''
  switch (log.level) {
    case 'debug':
      level = colors.bgWhite.green(' DEBUG:')
      break
    case 'info':
      level = colors.bgWhite.blue(' INFO:')
      break
    case 'warn':
      level = colors.bgWhite.yellow(' WARNING:')
      break
    case 'error':
      level = colors.bgWhite.red(' ERROR:')
      break
  }
  var context = log.context == null ? ''
    : '\n' + prettyjson.render(log.context)
      .split('\n')
      .map(line => '  ' + line)
      .join('\n');

  if (!_console) _console = console;
  _console.log(time + level + ' ' + log.msg + context)
}
