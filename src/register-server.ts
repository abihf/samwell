import { Level as LogLevel, Logger } from './logger';
import { getServerWriter } from './writer/server';

type LevelEnumKeys = keyof LogLevel;

export default function registerServer(logger: Logger) {
  logger.setWriter(getServerWriter(
    process.env.NODE_ENV,
    process.env.SAMWELL_OUTPUT,
  ));

  let level = LogLevel.DEBUG;
  if (process.env.SAMWELL_LEVEL) {
    const levelKey = process.env.SAMWELL_LEVEL as LevelEnumKeys;
    const levelFromEnv = LogLevel[levelKey];
    if (levelFromEnv) {
      level = levelFromEnv;
    }
  }
  logger.setLevel(level);
}
