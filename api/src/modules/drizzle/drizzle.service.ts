import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DatabaseSchema, DatabaseType } from '../../db/schema/schema';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private db: NodePgDatabase<DatabaseType>;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      user: this.configService.get<string>('DB_USER'),
      host: this.configService.get<string>('DB_HOST'),
      database: this.configService.get<string>('DB_NAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      port: this.configService.get<number>('DB_PORT'),
    });
    this.db = drizzle(this.pool, { schema: DatabaseSchema });
  }

  async onModuleInit() {
    Logger.debug(`DrizzleService connection initialized`, 'DrizzleService');
  }

  async onModuleDestroy() {
    await this.pool.end();

    Logger.debug(`DrizzleService connection closed`, 'main.ts');
  }

  getDatabase(): NodePgDatabase<DatabaseType> {
    return this.db;
  }
}
