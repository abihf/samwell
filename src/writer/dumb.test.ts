import dumbWriter from './dumb';
const constantTime = new Date('2017-10-07');

describe('Dumb Logger', () => {
  it('Should call console with message and context', () => {
    const logFunc = jest.fn();
    dumbWriter(
      {
        context: { test: 123 },
        level: 'debug',
        msg: 'Debug message',
        time: constantTime,
      },
      { debug: logFunc },
    );

    expect(logFunc).toHaveBeenCalledTimes(1);
    expect(logFunc.mock.calls[0][0]).toBe('Debug message');
    expect(logFunc.mock.calls[0][1]).toMatchObject({ test: 123 });
  });

  it('should call console.*', () => {
    const consoleMock = {
      debug: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    };

    Object.keys(consoleMock).forEach((level) => {
      dumbWriter(
        {
          context: null,
          level,
          msg: 'Hi',
          time: constantTime,
        },
        consoleMock,
      );
      expect(consoleMock[level]).toHaveBeenCalledTimes(1);
    });
  });
});
