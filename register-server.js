const logger = require('./index');
logger.writer = require('./lib/writer/server').getServerWriter(
  process.env.NODE_ENV,
  process.env.SAMWELL_OUTPUT,
);

module.exports = logger;
