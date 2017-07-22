// @flow

var terminalLogger = require('./terminal');

describe('Terminal Logger', () => {
  let logFunc = jest.fn();

  it('Should call console.log', () => {
    terminalLogger({
      time: new Date(),
      level: 'debug',
      msg: 'Hi',
      context: null,
    }, {log: logFunc});

    expect(logFunc).toHaveBeenCalledTimes(1);
    expect(logFunc.mock.calls[0][0]).toContain('DEBUG');
  })
});