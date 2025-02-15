import { Injectable, Logger } from '@nestjs/common';
import { LogRepository } from './logger.repository';

const LOGGER_LEVELS = {
  TRACE: 'TRACE',
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL',
};

export interface LogData {
  timestamp: Date;
  message: string;
  context: string;
  request_id: string;
  trace_id: string;
  method: string;
  url: string;
  error_stack: any;
}

export interface LogMessage extends LogData {
  level: string;
}

@Injectable()
export class LoggerService {
  private readonly appLogger = new Logger('MyService.name');

  constructor(private logRepository: LogRepository) {}

  trace(data: LogData) {
    this.logRepository.log({ ...data, level: LOGGER_LEVELS.TRACE });
  }

  debug(data: LogData) {
    this.logRepository.log({ ...data, level: LOGGER_LEVELS.DEBUG });
  }

  info(data: LogData) {
    this.logRepository.log({ ...data, level: LOGGER_LEVELS.INFO });
  }

  warn(data: LogData) {
    this.logRepository.log({ ...data, level: LOGGER_LEVELS.WARN });
  }

  error(data: LogData) {
    this.logRepository.log({ ...data, level: LOGGER_LEVELS.ERROR });
  }

  fatal(data: LogData) {
    this.logRepository.log({ ...data, level: LOGGER_LEVELS.FATAL });
  }
}
