import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../db/schema/schema';
import {
  Logs,
  LOGS_MAX_LENGTH_CONTEXT,
  LOGS_MAX_LENGTH_LEVEL,
  LOGS_MAX_LENGTH_METHOD,
  LOGS_MAX_LENGTH_URL,
} from '../../db/schema/tables/logs';
import { LogMessage } from './logger.service';
import { truncateMaxLength } from '../../db/helpers';

@Injectable()
export class LogRepository {
  constructor(private database: DrizzleService) {}

  private get db(): NodePgDatabase<DatabaseType> {
    return this.database.getDatabase();
  }

  async log(data: LogMessage) {
    const log = {
      ...data,
      level: truncateMaxLength(data.level, LOGS_MAX_LENGTH_LEVEL),
      context: truncateMaxLength(data.context, LOGS_MAX_LENGTH_CONTEXT),
      method: truncateMaxLength(data.method, LOGS_MAX_LENGTH_METHOD),
      url: truncateMaxLength(data.url, LOGS_MAX_LENGTH_URL),
    };

    await this.db.insert(Logs).values(log);
  }
}
