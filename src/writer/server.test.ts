import jsonWriter from './json';
import { getServerWriter } from './server';
import terminalWriter from './terminal';

describe('Server logger', () => {
  it('should use terminal if no environment defined', () => {
    expect(getServerWriter(null, null)).toBe(terminalWriter);
  });

  it('should use terminal on production', () => {
    expect(getServerWriter('production', null)).toBe(jsonWriter);
  });

  it('should respect override', () => {
    expect(getServerWriter('production', 'terminal')).toBe(terminalWriter);
    expect(getServerWriter(null, 'json')).toBe(jsonWriter);
  });
});
