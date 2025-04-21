import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../../db/schema/schema';
import { Media } from '../../../db/schema/tables/content/media';
import { CreateMediaDTO } from '../../../common/dto/create-media.dto';
import { MediaEntity } from '../../../db/schema/entities';
import { eq } from 'drizzle-orm';

@Injectable()
export class MediaRepository {
  constructor(private database: DrizzleService) {}

  private get db(): NodePgDatabase<DatabaseType> {
    return this.database.getDatabase();
  }

  async createWithTransaction(tx, data: CreateMediaDTO): Promise<MediaEntity> {
    const [newMedia] = await tx.insert(Media).values(data).returning();
    return newMedia;
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

  async findById(id: number): Promise<MediaEntity | undefined> {
    return this.db.query.Media.findFirst({
      where: eq(Media.id, id),
    });
  }

  async deleteById(id: number): Promise<MediaEntity> {
    const [deletedMedia] = await this.db
      .delete(Media)
      .where(eq(Media.id, id))
      .returning();
    return deletedMedia;
  }
}
