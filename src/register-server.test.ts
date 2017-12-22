import { Level, Logger, Writer } from './logger';
import registerServer from './register-server';

const DUMMY_WRITER: Writer = () => { return; };

describe('server configuration helper', () => {
  it('should change log level to debug', () => {
    const logger = new Logger({}, DUMMY_WRITER);
    registerServer(logger);

    expect(logger.getLevel()).toBe(Level.DEBUG);
  });

  it('should change the writer', () => {
    const logger = new Logger({}, DUMMY_WRITER);

    expect(logger.getWriter()).toBe(DUMMY_WRITER);
    registerServer(logger);
    expect(logger.getWriter()).not.toBe(DUMMY_WRITER);
  });

  it('should change log level based on environment variable', () => {
    const logger = new Logger({}, DUMMY_WRITER);
    process.env.SAMWELL_LEVEL = 'TRACE';
    registerServer(logger);
    process.env.SAMWELL_LEVEL = undefined;
    expect(logger.getLevel()).toBe(Level.TRACE);
  });

  it('should default server log level, if environment variable invalid', () => {
    const logger = new Logger({}, DUMMY_WRITER);
    process.env.SAMWELL_LEVEL = 'error';
    registerServer(logger);
    process.env.SAMWELL_LEVEL = undefined;
    expect(logger.getLevel()).toBe(Level.DEBUG);
  });

});
