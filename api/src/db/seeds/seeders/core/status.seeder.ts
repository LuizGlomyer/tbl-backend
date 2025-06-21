import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../../schema/schema';
import { Status, TABLE_STATUS } from '../../../schema/tables/core/status';
import { StatusEntity } from '../../../schema/entities';

export class StatusSeeder {
  public statusEntities: StatusEntity[];

  constructor(private db: NodePgDatabase<DatabaseType>) {}

  async seed() {
    console.log(`INSERT ${TABLE_STATUS}`);
    this.statusEntities = await this.db
      .insert(Status)
      .values([
        { name: 'backlog' },
        { name: 'in-progress' },
        { name: 'completed' },
        { name: 'on-hold' },
        { name: 'dropped' },
        { name: 'playing' },
        { name: 'watching' },
        { name: 'listening' },
        { name: 'reading' },
      ])
      .returning();
  }
}
