import jsonWriter from './json';
const constantTime = new Date('2017-10-07');

describe('JSON Logger', () => {
  it('Should return one line valid json', () => {
    const spy = jest.spyOn(console, 'log');
    const logItem = {
      context: { test: 123 },
      level: 'debug',
      msg: 'Debug message',
    };
    jsonWriter(Object.assign({}, logItem, { time: constantTime }));

    expect(spy).toHaveBeenCalledTimes(1);
    const content = spy.mock.calls[0][0];
    expect(content).not.toMatch(/\n/);
    expect(JSON.parse(content)).toMatchObject(logItem);

    spy.mockReset();
    spy.mockRestore();
  });

  it('Can handle unsafe context', () => {
    const spy = jest.spyOn(console, 'log');

    const obj1 = { a: 1, d: {} };
    const obj2 = { b: 2, c: obj1 };
    obj1.d = obj2;
    jsonWriter({
      context: obj2,
      level: 'debug',
      msg: 'Debug message',
      time: constantTime,
    });

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockReset();
    spy.mockRestore();
  });
});
