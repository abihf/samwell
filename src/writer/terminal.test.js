// @flow

const terminalWriter = require('./terminal');
const constantTime = new Date('2017-10-07');

describe('Terminal Logger', () => {
  it('Should call console.log', () => {
    const logFunc = jest.fn();
    terminalWriter(
      {
        time: constantTime,
        level: 'debug',
        msg: 'Debug message',
        context: null,
      },
      { log: logFunc }
    );

    expect(logFunc).toHaveBeenCalledTimes(1);
    expect(logFunc.mock.calls[0][0]).toContain('Debug message');
  });

  it('should print ISO formatted time', () => {
    const logFunc = jest.fn();
    const time = new Date();
    terminalWriter(
      {
        time,
        level: 'debug',
        msg: 'Hi',
        context: null,
      },
      { log: logFunc }
    );

    expect(logFunc).toHaveBeenCalledTimes(1);
    expect(logFunc.mock.calls[0][0]).toContain(time.toISOString());
  });

  it('should print log level', () => {
    const logFunc = jest.fn();
    ['debug', 'info', 'warn', 'error', '-'].forEach(level => {
      terminalWriter(
        {
          time: constantTime,
          level,
          msg: 'Hi',
          context: null,
        },
        { log: logFunc }
      );
    });

    expect(logFunc).toHaveBeenCalledTimes(5);
    ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'UNKNOWN'].forEach((text, i) => {
      expect(logFunc.mock.calls[i][0]).toContain(text);
    });
  });

  it('should print context', () => {
    const logFunc = jest.fn();
    terminalWriter(
      {
        time: constantTime,
        level: 'debug',
        msg: 'Hi',
        context: {
          field1: 'value',
          field2: {
            child: null,
          },
        },
      },
      { log: logFunc }
    );

    expect(logFunc).toHaveBeenCalledTimes(1);
    const content = logFunc.mock.calls[0][0];
    [
      /field1.*:.*"?.*value.*"?/,
      /field2.*:/,
      /child.*:.*null/,
    ].forEach(re => {
      expect(content).toMatch(re);
    });
  });
});
