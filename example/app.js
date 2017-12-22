const logger = require('../lib/index');
require('../register-server')(logger);

logger.debug('Hello word!', { test: 1, otherField: { child: true } });
logger.info('I am {0}.', 'Samwell');

const childLogger = logger.createLogger({ where: 'Whesteros' });
childLogger.warn('I think I found {0}', 'something', {
  what: 'Iron Throne',
});

try {
  throw new Error('This error will be printed');
} catch (e) {
  logger.fatal(e);
}
