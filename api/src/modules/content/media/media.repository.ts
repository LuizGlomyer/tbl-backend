import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../../db/schema/schema';
import { Media } from '../../../db/schema/tables/content/media';
import {
  CreateMediaDTO,
  InsertMediaDTO,
} from '../../../common/dto/content/create-media.dto';
import { MediaEntity } from '../../../db/schema/entities';
import { and, eq, ilike, or, SQL } from 'drizzle-orm';
import { MediaFiltersDTO } from '../../../common/dto/content/media.dto';

@Injectable()
export class MediaRepository {
  constructor(private database: DrizzleService) {}

  private get db(): NodePgDatabase<DatabaseType> {
    return this.database.getDatabase();
  }

  async createWithTransaction(tx, data: InsertMediaDTO): Promise<MediaEntity> {
    const [newMedia] = await tx.insert(Media).values(data).returning();
    return newMedia;
  }

  async findAll(search: string | undefined): Promise<MediaEntity[]> {
    const conditions: SQL[] = [];

    if (search) {
      conditions.push(ilike(Media.name, `%${search}%`));
      conditions.push(ilike(Media.acronym, `%${search}%`));
    }

    const results = this.db
      .select()
      .from(Media)
      .where(or(...conditions));

    return results;
  }

  async findById(id: number): Promise<MediaEntity | undefined> {
    return this.db.query.Media.findFirst({
      where: eq(Media.id, id),
    });
  }

  async findByFilters(filters: MediaFiltersDTO): Promise<MediaEntity[]> {
    console.log(filters);
    const conditions: SQL[] = [];

    if (filters?.name) conditions.push(ilike(Media.name, `%${filters.name}%`));
    if (filters?.acronym)
      conditions.push(ilike(Media.acronym, `%${filters.acronym}%`));
    if (filters?.type?.length)
      conditions.push(ilike(Media.type, `%${filters.type}%`));

    const results = this.db
      .select()
      .from(Media)
      .where(and(...conditions));

    return results;
  }

  async updatePlatformWithTransaction(
    tx,
    mediaId: number,
    data: CreateMediaDTO,
  ): Promise<MediaEntity> {
    const [updatedMedia] = await tx
      .update(Media)
      .set({ ...data, updated_at: new Date() })
      .where(eq(Media.id, mediaId))
      .returning();

    return updatedMedia;
  }

  async deleteById(id: number): Promise<MediaEntity> {
    const [deletedMedia] = await this.db
      .delete(Media)
      .where(eq(Media.id, id))
      .returning();
    return deletedMedia;
  }
}
