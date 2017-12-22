import { Logger } from './logger';
import DumbWriter from './writer/dumb';

/**
 * Default logger.
 */
const defaultLogger = new Logger(undefined, DumbWriter);

// default export
export = defaultLogger;
