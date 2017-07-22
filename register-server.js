const logger = require('./index');
logger.writer = require('./lib/writer/server');

module.exports = logger;
