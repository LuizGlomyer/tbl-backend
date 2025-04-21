import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../../db/schema/schema';
import {
  RequestCreatePlatformDTO,
  InsertPlatformDTO,
  CreatePlatformDTO,
} from '../../../common/dto/create-platform.dto';
import { Platforms } from '../../../db/schema/tables/content/platforms';
import { MediaRepository } from '../media/media.repository';
import { MediaEntity, PlatformsEntity } from '../../../db/schema/entities';
import { MediaWithPlatform } from '../../../common/types/media.type';
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

  async create(data: RequestCreatePlatformDTO): Promise<MediaWithPlatform> {
    const result: MediaWithPlatform = await this.db.transaction(async (tx) => {
      const media: MediaEntity =
        await this.mediaRepository.createWithTransaction(tx, data.media);
      const platforms: PlatformsEntity = await this.createWithTransaction(tx, {
        ...data.platforms,
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

  async findAll(): Promise<MediaWithPlatform[]> {
    return this.db
      .select()
      .from(Platforms)
      .innerJoin(Media, eq(Platforms.mediaId, Media.id));
  }

  async findById(id: number): Promise<MediaWithPlatform> {
    const [platform] = await this.db
      .select()
      .from(Platforms)
      .innerJoin(Media, eq(Platforms.mediaId, Media.id))
      .where(eq(Platforms.id, id));
    return platform;
  }

  async updateWithTransaction(
    tx,
    platformId: number,
    data: CreatePlatformDTO,
  ): Promise<PlatformsEntity> {
    const [updatedPlatform] = await tx
      .update(Platforms)
      .set({ ...data, updated_at: new Date() })
      .where(eq(Platforms.id, platformId))
      .returning();

    return updatedPlatform;
  }

  async updateById(
    platformId: number,
    mediaId: number,
    data: RequestCreatePlatformDTO,
  ): Promise<MediaWithPlatform> {
    const result: MediaWithPlatform = await this.db.transaction(async (tx) => {
      const media: MediaEntity =
        await this.mediaRepository.updatePlatformWithTransaction(
          tx,
          mediaId,
          data.media,
        );

      const platforms: PlatformsEntity = await this.updateWithTransaction(
        tx,
        platformId,
        data.platforms,
      );
      return { media, platforms };
    });

    return result;
  }
}
