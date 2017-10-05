import jsonWriter from './json';
const constantTime = new Date('2017-10-07');

describe('JSON Logger', () => {
  it('Should return one line valid json', () => {
    const logFunc = jest.fn();
    const logItem = {
      context: { test: 123 },
      level: 'debug',
      msg: 'Debug message',
    };
    jsonWriter(Object.assign({}, logItem, { time: constantTime }), {
      log: logFunc,
    });

    expect(logFunc).toHaveBeenCalledTimes(1);
    const content = logFunc.mock.calls[0][0];
    expect(content).not.toMatch(/\n/);
    expect(JSON.parse(content)).toMatchObject(logItem);
  });

  it('Can handle unsafe context', () => {
    const logFunc = jest.fn();
    const obj1 = { a: 1, d: {} };
    const obj2 = { b: 2, c: obj1 };
    obj1.d = obj2;
    jsonWriter(
      {
        context: obj2,
        level: 'debug',
        msg: 'Debug message',
        time: constantTime,
      },
      { log: logFunc },
    );

    expect(logFunc).toHaveBeenCalledTimes(1);
  });
});
