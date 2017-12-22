import * as logger from './index';
import { Logger } from './logger';

describe('main module', () => {
  it('should be an instance of Logger', () => {
    expect(logger).toBeInstanceOf(Logger);
  });
});
