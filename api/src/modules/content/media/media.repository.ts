import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DatabaseType } from '../../../db/schema/schema';
import { Media } from '../../../db/schema/tables/content/media';
import { CreateMediaDTO } from './dto/create-media.dto';
import { MediaEntity } from '../../../db/schema/entities';

@Injectable()
export class MediaRepository {
  constructor(private database: DrizzleService) {}

  private get db(): NodePgDatabase<DatabaseType> {
    return this.database.getDatabase();
  }

  async create(tx, data: CreateMediaDTO): Promise<MediaEntity> {
    const [newMedia] = await tx.insert(Media).values(data).returning();
    return newMedia;
  }
}
