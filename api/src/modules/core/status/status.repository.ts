import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../../db/schema/schema';

import { StatusEntity } from '../../../db/schema/entities';
import { eq } from 'drizzle-orm';
import { Status } from '../../../db/schema/tables/core/status';

@Injectable()
export class StatusRepository {
  constructor(private database: DrizzleService) {}

  private get db(): NodePgDatabase<DatabaseType> {
    return this.database.getDatabase();
  }

  async findAll(): Promise<StatusEntity[]> {
    const results = this.db.select().from(Status);

    return results;
  }

  async findById(id: number): Promise<StatusEntity | undefined> {
    return this.db.query.Status.findFirst({
      where: eq(Status.id, id),
    });
  }
}
