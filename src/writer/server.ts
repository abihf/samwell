import { Writer } from '../logger';
import JsonWriter from './json';
import TerminalWriter from './terminal';

export function getServerWriter(
  nodeEnv?: string,
  samwellOutput?: string,
): Writer {
  let writerType = samwellOutput;
  if (!writerType) {
    writerType = nodeEnv === 'production' ? 'json' : 'terminal';
  }
  if (writerType === 'json') {
    return JsonWriter;
  }
  return TerminalWriter;
}

export const defaultWriter = getServerWriter(
  process.env.NODE_ENV,
  process.env.SAMWELL_OUTPUT,
);
