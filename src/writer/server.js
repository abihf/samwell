// @flow

import process from 'process';
import type { Writer } from '../logger'; 

var writer: Writer = log => {};

var writerType = process.env.SAMWELL_OUTPUT;
if (!writerType) {
  writerType = process.env.NODE_ENV === 'production' ? 'json' : 'terminal';
}
if (writerType === 'json') {
  writer = require('./json');
} else {
  writer = require('./terminal');
}

module.exports = writer;
