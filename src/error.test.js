// @flow

const { errorToObject, normalizeLogError } = require('./error');

describe('Error handler', () => {
  it('should convert Error object to map', () => {
    const err = new Error('error message');
    const map = errorToObject(err);
    expect(map).toMatchObject({
      name: 'Error',
      message: 'error message',
    });
    expect(map.stack.length).toBeGreaterThan(0);
  });

  it('should convert error inside LogItem', () => {
    const normalized = normalizeLogError({
      time: new Date(),
      level: 'debug',
      msg: 'log message',
      context: {
        err: new Error('another error message'),
      },
    });

    expect(normalized).toMatchObject({
      msg: 'log message',
      context: {
        err: {
          name: 'Error',
          message: 'another error message',
        },
      },
    });
  });
});
