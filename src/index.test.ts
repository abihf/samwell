
import { Logger } from './logger';

describe('Lala', () => {
  it('Should return instance of Logger', () => {
    const logger = require('./index').default;
    expect(logger).toBeInstanceOf(Logger);
  });
});
