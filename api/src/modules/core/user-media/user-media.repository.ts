import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../../db/schema/schema';

import { UserMediaEntity } from '../../../db/schema/entities';
import { and, eq } from 'drizzle-orm';
import { UserMedia } from '../../../db/schema/tables/core/user_media';
import { UserMediaDTO } from '../../../common/dto/core/user-media.dto';
import { getDrizzleSingleResult } from '../../../db/utils';

@Injectable()
export class UserMediaRepository {
  constructor(private database: DrizzleService) {}

  private get db(): NodePgDatabase<DatabaseType> {
    return this.database.getDatabase();
  }

  async create(data: UserMediaDTO): Promise<UserMediaEntity> {
    const result = await this.db.insert(UserMedia).values(data).returning();
    return getDrizzleSingleResult(result) as UserMediaEntity;
  }

  async findAll(): Promise<UserMediaEntity[]> {
    const results = await this.db.select().from(UserMedia);
    return results as UserMediaEntity[];
  }

  async findById(id: number): Promise<UserMediaEntity | undefined> {
    const result = await this.db.query.UserMedia.findFirst({
      where: eq(UserMedia.id, id),
    });
    return result as UserMediaEntity | undefined;
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
