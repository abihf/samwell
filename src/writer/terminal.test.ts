import terminalWriter from './terminal';
const constantTime = new Date('2017-10-07');

describe('Terminal Logger', () => {
  it('Should call console.log', () => {
    const logFunc = jest.fn();
    terminalWriter(
      {
        context: null,
        level: 'debug',
        msg: 'Debug message',
        time: constantTime,
      },
      { log: logFunc },
    );

    expect(logFunc).toHaveBeenCalledTimes(1);
    expect(logFunc.mock.calls[0][0]).toContain('Debug message');
  });

  it('should print ISO formatted time', () => {
    const logFunc = jest.fn();
    const time = new Date();
    terminalWriter(
      {
        context: null,
        level: 'debug',
        msg: 'Hi',
        time,
      },
      { log: logFunc },
    );

    expect(logFunc).toHaveBeenCalledTimes(1);
    expect(logFunc.mock.calls[0][0]).toContain(time.toISOString());
  });

  it('should print log level', () => {
    const logFunc = jest.fn();
    ['debug', 'info', 'warn', 'error', '-'].forEach((level) => {
      terminalWriter(
        {
          context: null,
          level,
          msg: 'Hi',
          time: constantTime,
        },
        { log: logFunc },
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
        context: {
          field1: 'value',
          field2: {
            child: null,
          },
        },
        level: 'debug',
        msg: 'Hi',
        time: constantTime,
      },
      { log: logFunc },
    );

    expect(logFunc).toHaveBeenCalledTimes(1);
    const content = logFunc.mock.calls[0][0];
    [
      /field1.*:.*"?.*value.*"?/,
      /field2.*:/,
      /child.*:.*null/,
    ].forEach((re) => {
      expect(content).toMatch(re);
    });
  });
});
