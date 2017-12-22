import { LevelString } from '../logger';
import dumbWriter, { LEVEL_METHOD_MAP } from './dumb';

const constantTime = new Date('2017-10-07');

describe('Dumb Logger', () => {
  it('Should call console with message and context', () => {
    const spy = jest.spyOn(console, 'info');
    dumbWriter({
      context: { test: 123 },
      level: LevelString.INFO,
      msg: 'Debug message',
      time: constantTime,
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe('Debug message');
    expect(spy.mock.calls[0][1]).toMatchObject({ test: 123 });
    spy.mockReset();
    spy.mockRestore();
  });

  it('should call console.* correctly', () => {
    Object.keys(LEVEL_METHOD_MAP).map((level: LevelString) => {
      const method = LEVEL_METHOD_MAP[level];
      const spy = jest.spyOn(console, method);
      dumbWriter({
        context: null,
        level,
        msg: level as string,
        time: constantTime,
      });
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockReset();
      spy.mockRestore();
    });
  });
});
