// @flow
require('../register-server');
const logger = require('../index');

logger.debug('Hello word!', { test: 1, otherField: { child: true } });
logger.info('I am {0}.', 'Samwell');

const childLogger = logger.createChild({ where: 'Whesteros' });
childLogger.warn('I think I found {0}', 'something', {
  what: 'Iron Throne',
});

try {
  throw new Error('This error will be printed');
} catch (e) {
  logger.error(e);
}
