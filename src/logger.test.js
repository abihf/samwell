const { Logger } = require('./logger');

describe('Logger', () => {
  it('should return valid date', () => {
    var writer = jest.fn();
    var logger = new Logger(null, writer);
    logger.debug('Hello');

    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toHaveProperty('time');
    expect(writer.mock.calls[0][0].time).toBeInstanceOf(Date);
  });

  it('should return valid log level', () => {
    var writer = jest.fn();
    var logger = new Logger(null, writer);
    logger.debug('Hello');
    logger.info('Word');
    logger.warn('I am');
    logger.error('Samwell');

    expect(writer).toHaveBeenCalledTimes(4);
    expect(writer.mock.calls[0][0]).toMatchObject({
      level: 'debug'
    });
    expect(writer.mock.calls[1][0]).toMatchObject({
      level: 'info'
    });
    expect(writer.mock.calls[2][0]).toMatchObject({
      level: 'warn'
    });
    expect(writer.mock.calls[3][0]).toMatchObject({
      level: 'error'
    });
  })

  it('should format string', () => {
    var writer = jest.fn();
    var logger = new Logger(null, writer);
    logger.info('Hello %s (%d)', 'name', 12);

    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toMatchObject({
      msg: 'Hello name (12)'
    });
  })

  it('should return context', () => {
    var writer = jest.fn();
    var logger = new Logger(null, writer)
    logger.info('Hello', {
      test: 123
    })

    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toMatchObject({
      context: {
        test: 123
      }
    });
  })

  it('should format string & also return context', () => {
    var writer = jest.fn();
    var logger = new Logger(null, writer);
    logger.info('Hello %s (%d)', 'other', 21, {
      test: 234
    });

    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toMatchObject({
      msg: 'Hello other (21)',
      context: {
        test: 234
      },
    });
  });

  it('should log the error', () => {
    var writer = jest.fn();
    var logger = new Logger(null, writer);
    var err = new Error('error message');
    logger.error('Error test', err);

    expect(writer).toHaveBeenCalledTimes(1);
    expect(writer.mock.calls[0][0]).toMatchObject({
      msg: 'Error test',
      context: { err },
    });

  });
});
