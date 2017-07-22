const logger = require('./index');
logger.writer = require('./lib/writer/server').defaultWriter;

module.exports = logger;
