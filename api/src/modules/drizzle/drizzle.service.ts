import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private db: NodePgDatabase;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      user: this.configService.get<string>('DB_USER'),
      host: this.configService.get<string>('DB_HOST'),
      database: this.configService.get<string>('DB_DATABASE'),
      password: this.configService.get<string>('DB_PASSWORD'),
      port: Number(this.configService.get<string>('DB_PORT')),
    });
    this.db = drizzle(this.pool);
  }

  async onModuleInit() {
    console.log('DrizzleService initialized');
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('DrizzleService connection closed');
  }

  getDatabase(): NodePgDatabase {
    return this.db;
  }
}
