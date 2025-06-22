import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../../db/schema/schema';

import { BacklogEntity } from '../../../db/schema/entities';
import { eq } from 'drizzle-orm';
import { Backlog } from '../../../db/schema/tables/core/backlog';
import {
  CreateBacklogDTO,
  UpdateBacklogDTO,
} from '../../../common/dto/core/backlog.dto';
import { getDrizzleSingleResult } from '../../../db/utils';

@Injectable()
export class BacklogRepository {
  constructor(private database: DrizzleService) {}

  private get db(): NodePgDatabase<DatabaseType> {
    return this.database.getDatabase();
  }

  async create(data: CreateBacklogDTO): Promise<BacklogEntity> {
    const result = await this.db.insert(Backlog).values(data).returning();
    return getDrizzleSingleResult(result) as BacklogEntity;
  }

  async findAll(): Promise<BacklogEntity[]> {
    const results = await this.db.select().from(Backlog);
    return results as BacklogEntity[];
  }

  async findById(id: number): Promise<BacklogEntity | undefined> {
    const result = await this.db.query.Backlog.findFirst({
      where: eq(Backlog.id, id),
    });
    return result as BacklogEntity | undefined;
  }

  async updateById(id: number, data: UpdateBacklogDTO): Promise<BacklogEntity> {
    const updatedRow = await this.db
      .update(Backlog)
      .set({ ...data, updated_at: new Date() })
      .where(eq(Backlog.id, id))
      .returning();

    return getDrizzleSingleResult(updatedRow) as BacklogEntity;
  }

  async deleteById(id: number): Promise<BacklogEntity | undefined> {
    const deleted = await this.db
      .delete(Backlog)
      .where(eq(Backlog.id, id))
      .returning();
    return getDrizzleSingleResult(deleted) as BacklogEntity | undefined;
  }
}
