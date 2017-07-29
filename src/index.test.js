// @flow
/* eslint-env jest */

const { Logger } = require('./logger');

describe('Lala', () => {
  it('Should return instance of Logger', () => {
    const logger = require('./index');
    expect(logger).toBeInstanceOf(Logger);
  });
});
