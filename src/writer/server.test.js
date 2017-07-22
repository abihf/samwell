// @flow

const { getServerWriter } = require('./server');
const jsonWriter = require('./json');
const terminalWriter = require('./terminal');

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
