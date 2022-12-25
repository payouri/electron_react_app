import path from 'path';
import { createLogger, LeveledLogMethod, transports } from 'winston';

const LOGS_DIR = path.join(process.cwd(), 'logs');

const createFileTransport = ({
  filename,
  level,
}: {
  filename: string;
  level: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';
}) =>
  new transports.File({
    filename: path.join(LOGS_DIR, filename),
    level,
  });

const fileLogger = createLogger({
  transports: [createFileTransport({ filename: 'error.log', level: 'error' })],
});

export { fileLogger };
