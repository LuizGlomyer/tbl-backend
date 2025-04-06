import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../../db/schema/schema';
import {
  InsertPlatformDTO,
  CreatePlatformDTO,
} from './dto/create-platform.dto';
import { Platforms } from '../../../db/schema/tables/content/platforms';
import { MediaRepository } from '../media/media.repository';
import { MediaEntity, PlatformsEntity } from '../../../db/schema/entities';
import { MediaPlatform } from '../../../common/types/media.type';
import { Media } from '../../../db/schema/tables/content/media';
import { eq } from 'drizzle-orm';

@Injectable()
export class PlatformsRepository {
  constructor(
    private database: DrizzleService,
    private mediaRepository: MediaRepository,
  ) {}

  private get db(): NodePgDatabase<DatabaseType> {
    return this.database.getDatabase();
  }

  async create(data: CreatePlatformDTO): Promise<MediaPlatform> {
    const result: MediaPlatform = await this.db.transaction(async (tx) => {
      const media: MediaEntity = await this.mediaRepository.create(tx, data);

      const platforms: PlatformsEntity = await this.createWithTransaction(tx, {
        ...data,
        mediaId: media.id,
      });

      return { media, platforms };
    });

    return result;
  }

  async createWithTransaction(
    tx,
    data: InsertPlatformDTO,
  ): Promise<PlatformsEntity> {
    const [newPlatform] = await tx.insert(Platforms).values(data).returning();
    return newPlatform;
  }

  async findAll(): Promise<any> {
    return this.db
      .select()
      .from(Platforms)
      .innerJoin(Media, eq(Platforms.mediaId, Media.id));
  }
}
