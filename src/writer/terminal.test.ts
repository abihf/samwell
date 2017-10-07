import terminalWriter from './terminal';
const constantTime = new Date('2017-10-07T01:02:03.045');

describe('Terminal Logger', () => {
  beforeEach(() => {
    process.env.SAMWELL_DEBUG = '1';
  });

  it('Should call console.log', () => {
    const spy = jest.spyOn(console, 'log');
    terminalWriter({
      context: null,
      level: 'debug',
      msg: 'Debug message',
      time: constantTime,
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toContain('Debug message');

    spy.mockReset();
    spy.mockRestore();
  });

  it('Should not show debug level log', () => {
    const spy = jest.spyOn(console, 'log');
    process.env.SAMWELL_DEBUG = '';
    terminalWriter({
      context: null,
      level: 'debug',
      msg: 'Debug message',
      time: constantTime,
    });

    expect(spy).toHaveBeenCalledTimes(0);
    spy.mockReset();
    spy.mockRestore();

  });

  it('should print ISO formatted time', () => {
    const spy = jest.spyOn(console, 'log');
    const time = constantTime;
    terminalWriter({
      context: null,
      level: 'debug',
      msg: 'Hi',
      time,
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toContain('01:02:03:045');

    spy.mockReset();
    spy.mockRestore();
  });

  it('should print log level', () => {
    const spy = jest.spyOn(console, 'log');
    ['debug', 'info', 'warn', 'error', '-'].forEach((level) => {
      terminalWriter({
        context: null,
        level,
        msg: 'Hi',
        time: constantTime,
      });
    });

    expect(spy).toHaveBeenCalledTimes(5);
    ['DBG', 'INF', 'WRN', 'ERR', '???'].forEach((text, i) => {
      expect(spy.mock.calls[i][0]).toContain(text);
    });

    spy.mockReset();
    spy.mockRestore();
  });

  it('should print context', () => {
    const spy = jest.spyOn(console, 'log');
    terminalWriter({
      context: {
        field1: 'value',
        field2: {
          child: null,
        },
      },
      level: 'debug',
      msg: 'Hi',
      time: constantTime,
    });

    expect(spy).toHaveBeenCalledTimes(1);
    const content = spy.mock.calls[0][0];
    [
      /field1.*:.*"?.*value.*"?/,
      /field2.*:/,
      /child.*:.*null/,
    ].forEach((re) => {
      expect(content).toMatch(re);
    });

    spy.mockReset();
    spy.mockRestore();
  });
});
