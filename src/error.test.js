const { errorToObject } = require('./error');

describe('Error handler', () => {
  it('should convert Error object to map', () => {
    const err = new Error('error message');
    const map = errorToObject(err);
    expect(map).toMatchObject({
      name: 'Error',
      message: 'error message',
    });
    expect(map.stack.length).toBeGreaterThan(0);
  });
});
