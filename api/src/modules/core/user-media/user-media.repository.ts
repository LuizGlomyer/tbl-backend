import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../../db/schema/schema';

import { UserMediaEntity } from '../../../db/schema/entities';
import { and, eq } from 'drizzle-orm';
import { UserMedia } from '../../../db/schema/tables/core/user_media';
import { UserMediaDTO } from '../../../common/dto/core/user-media.dto';

@Injectable()
export class UserMediaRepository {
  constructor(private database: DrizzleService) {}

  private get db(): NodePgDatabase<DatabaseType> {
    return this.database.getDatabase();
  }

  async create(data: UserMediaDTO): Promise<UserMediaEntity> {
    const result = await this.db.insert(UserMedia).values(data).returning();
    const userMedia = Array.isArray(result) ? result[0] : undefined;
    return userMedia;
  }

  async findAll(): Promise<UserMediaEntity[]> {
    const results = await this.db.select().from(UserMedia);
    return results as UserMediaEntity[];
  }

  async findByPrimaryKey(
    userId: number,
    mediaId: number,
  ): Promise<UserMediaEntity | undefined> {
    const result = await this.db.query.UserMedia.findFirst({
      where: and(eq(UserMedia.userId, userId), eq(UserMedia.mediaId, mediaId)),
    });
    return result as UserMediaEntity | undefined;
  }
}
