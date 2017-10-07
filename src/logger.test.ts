
import { Logger } from './logger';

describe('Logger', () => {
  it('should return valid date', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.debug('Hello');

    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toHaveProperty('time');
    expect(writer.mock.calls[0][0].time).toBeInstanceOf(Date);
  });

  it('should return valid log level', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.debug('Hello');
    logger.info('Word');
    logger.warn('I am');
    logger.error('Samwell');

    expect(writer).toHaveBeenCalledTimes(4);
    expect(writer.mock.calls[0][0]).toMatchObject({
      level: 'debug',
    });
    expect(writer.mock.calls[1][0]).toMatchObject({
      level: 'info',
    });
    expect(writer.mock.calls[2][0]).toMatchObject({
      level: 'warn',
    });
    expect(writer.mock.calls[3][0]).toMatchObject({
      level: 'error',
    });
  });

  it('should format string', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    logger.info('Hello {0} ({1})', 'name', 12);
    logger.warn('Args not {0}: {1}', 'found');

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

    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0].context.err).toBeInstanceOf(Error);
    expect(writer.mock.calls[0][0].context.err.message)
      .toBe('Logger has been called without message');
  });

  it('should be able to create child logger', () => {
    const writer = jest.fn();
    const logger = new Logger(undefined, writer);
    const childLogger = logger.createChild({ field1: 'value1' });
    childLogger.info('Child logger test', { field2: 'value2' });

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
