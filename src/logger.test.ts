
import { Level, LevelString, Logger } from './logger';

const LOG_DELAY = 1;

describe('Logger', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('Should defer log processing', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.info('Hello');

    expect(writer).not.toBeCalled();
    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toBeCalled();
  });

  it('should return valid date', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    const now = new Date();
    logger.info('Hello');

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toHaveProperty('time');
    const time: Date = writer.mock.calls[0][0].time;
    expect(time).toBeInstanceOf(Date);
    expect(time).toEqual(now);
  });

  it('should respect log level', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.setLevel(Level.ERROR);

    logger.trace('A');
    logger.debug('B');
    logger.info('C');
    logger.warn('D');
    logger.error('E');
    logger.fatal('F');

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(2);
  });

  it('should respect log level (2)', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.setLevel(Level.DEBUG);

    logger.trace('A');
    logger.debug('B');
    logger.info('C');
    logger.warn('D');
    logger.error('E');
    logger.fatal('F');

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(5);
  });

  it('should return valid log level', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.setLevel(Level.TRACE);

    logger.trace('Hello');
    logger.debug('Word');
    logger.info('I');
    logger.warn('am');
    logger.error('Samwell');
    logger.fatal('!');

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(6);
    expect(writer.mock.calls.map((args) => args[0].level)).toEqual([
      LevelString.TRACE,
      LevelString.DEBUG,
      LevelString.INFO,
      LevelString.WARNING,
      LevelString.ERROR,
      LevelString.FATAL,
    ]);
  });

  it('should format string', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.info('Hello {0} ({1})', 'name', 12);
    logger.warn('Args not {0}: {1}', 'found');

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(2);
    expect(writer.mock.calls[0][0]).toMatchObject({
      msg: 'Hello name (12)',
    });
    expect(writer.mock.calls[1][0]).toMatchObject({
      msg: 'Args not found: {1}',
    });
  });

  it('should return context', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.info('Hello', {
      test: 123,
    });

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toMatchObject({
      context: {
        test: 123,
      },
    });
  });

  it('should format string & also return context', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.info('Hello {0} ({1})', 'other', 21, {
      test: 234,
    });

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toMatchObject({
      context: {
        test: 234,
      },
      msg: 'Hello other (21)',
    });
  });

  it('should log the error', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    const err = new Error('error message');
    logger.error('Error test', err);

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toMatchObject({
      context: { err },
      msg: 'Error test',
    });
  });

  it('should be able take message from error', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    const err = new Error('error message');
    logger.error(err);

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toMatchObject({
      context: { err },
      msg: 'error message',
    });
  });

  it('should show error when log function has been called without message', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.info();

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0].context.err).toBeInstanceOf(Error);
    expect(writer.mock.calls[0][0].context.err.message)
      .toBe('Logger has been called without message');
  });

  it('should be able to create child logger', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    const childLogger = logger.createLogger({ field1: 'value1' });
    childLogger.info('Child logger test', { field2: 'value2' });

    jest.runTimersToTime(LOG_DELAY);
    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toMatchObject({
      context: {
        field1: 'value1',
        field2: 'value2',
      },
      msg: 'Child logger test',
    });
  });
});
