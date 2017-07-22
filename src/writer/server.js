// @flow

import type { Writer } from '../logger';

export function getServerWriter(
  nodeEnv: ?string,
  samwellOutput: ?string
): Writer {
  let writerType = samwellOutput;
  if (!writerType) {
    writerType = nodeEnv === 'production' ? 'json' : 'terminal';
  }
  if (writerType === 'json') {
    return require('./json');
  }
  return require('./terminal');
}

export const defaultWriter = getServerWriter(
  process.env.NODE_ENV,
  process.env.SAMWELL_OUTPUT
);
