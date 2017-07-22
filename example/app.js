/*@flow*/

const logger = require('../index');
require('../register-server');

logger.debug('Hello word!', {test: 1, otherField: {child: true}});
logger.info('I am %s.', 'Samwell');

const childLogger = logger.createChild({where: 'Whesteros'});
childLogger.warn('I think I found %s', 'something', {
  what: 'Iron Throne'
});

try {
  throw new Error('This error will be printed')
} catch (e) {
  logger.error(e);
}