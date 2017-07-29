// @flow
/* eslint-env jest */

const dumbWriter = require('./dumb');
const constantTime = new Date('2017-10-07');

describe('Dumb Logger', () => {
  it('Should call console with message and context', () => {
    const logFunc = jest.fn();
    dumbWriter(
      {
        time: constantTime,
        level: 'debug',
        msg: 'Debug message',
        context: { test: 123 },
      },
      { debug: logFunc }
    );

    expect(logFunc).toHaveBeenCalledTimes(1);
    expect(logFunc.mock.calls[0][0]).toBe('Debug message');
    expect(logFunc.mock.calls[0][1]).toMatchObject({ test: 123 });
  });

  it('should call console.*', () => {
    const consoleMock = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    Object.keys(consoleMock).forEach(level => {
      dumbWriter(
        {
          time: constantTime,
          level,
          msg: 'Hi',
          context: null,
        },
        consoleMock
      );
      expect(consoleMock[level]).toHaveBeenCalledTimes(1);
    });
  });
});
