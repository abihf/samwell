import { errorToObject, normalizeLogError } from './error';

describe('Error handler', () => {
  it('should convert Error object to map', () => {
    const err = new Error('error message');
    const map = errorToObject(err);
    expect(map).toMatchObject({
      message: 'error message',
      name: 'Error',
    });
    expect(map.stack.length).toBeGreaterThan(0);
  });

  it('should convert error inside LogItem', () => {
    const normalized = normalizeLogError({
      context: {
        err: new Error('another error message'),
      },
      level: 'debug',
      msg: 'log message',
      time: new Date(),
    });

    expect(normalized).toMatchObject({
      context: {
        err: {
          message: 'another error message',
          name: 'Error',
        },
      },
      msg: 'log message',
    });
  });
});
