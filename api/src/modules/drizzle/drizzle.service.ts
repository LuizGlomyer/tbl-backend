import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DatabaseSchema } from '../../db/schema/schema';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private db: NodePgDatabase<typeof DatabaseSchema>;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      user: this.configService.get<string>('DB_USER'),
      host: this.configService.get<string>('DB_HOST'),
      database: this.configService.get<string>('DB_DATABASE'),
      password: this.configService.get<string>('DB_PASSWORD'),
      port: this.configService.get<number>('DB_PORT'),
    });
    this.db = drizzle(this.pool, { schema: DatabaseSchema });
  }

  async onModuleInit() {
    console.log('DrizzleService initialized');
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('DrizzleService connection closed');
  }

  getDatabase(): NodePgDatabase<typeof DatabaseSchema> {
    return this.db;
  }
}
