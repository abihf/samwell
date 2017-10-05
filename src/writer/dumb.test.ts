import dumbWriter from './dumb';
const constantTime = new Date('2017-10-07');

describe('Dumb Logger', () => {
  it('Should call console with message and context', () => {
    const spy = jest.spyOn(console, 'info');
    dumbWriter({
      context: { test: 123 },
      level: 'info',
      msg: 'Debug message',
      time: constantTime,
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe('Debug message');
    expect(spy.mock.calls[0][1]).toMatchObject({ test: 123 });
    spy.mockReset();
    spy.mockRestore();
  });

  it('Should not call console.log', () => {
    // TODO: how to check it?
    dumbWriter({
      context: { test: 123 },
      level: 'debug',
      msg: 'Debug message',
      time: constantTime,
    });
  });

  it('should call console.*', () => {
    type ConsoleFunctions = 'info' | 'warn' | 'error';
    const levels = ['info', 'warn', 'error'];

    levels.forEach((level: ConsoleFunctions, i) => {
      const spy = jest.spyOn(console, level);
      dumbWriter({
        context: null,
        level,
        msg: 'Hi',
        time: constantTime,
      });
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockReset();
      spy.mockRestore();
    });
  });
});
