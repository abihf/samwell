// @flow

const terminalLogger = require('./terminal');

describe('Terminal Logger', () => {
  it('Should call console.log', () => {
    const logFunc = jest.fn();

    terminalLogger(
      {
        time: new Date(),
        level: 'debug',
        msg: 'Hi',
        context: null,
      },
      { log: logFunc }
    );

    expect(logFunc).toHaveBeenCalledTimes(1);
    expect(logFunc.mock.calls[0][0]).toContain('DEBUG');
  });
});
