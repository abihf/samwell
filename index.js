const Logger = require('./lib/logger').Logger;
const DumbWriter = require('./lib/writer/dumb').default;
module.exports = new Logger(undefined, DumbWriter);
