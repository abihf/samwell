// @flow

import DumbWriter from './writer/dumb';
import { Logger } from './logger';

module.exports = new Logger(null, DumbWriter);
