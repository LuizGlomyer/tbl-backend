import { Injectable } from '@nestjs/common';
import {
  CreateGameDTO,
  InsertGameDTO,
  RequestCreateGameDTO,
} from '../../../common/dto/create-game.dto';
import { MediaWithGames } from '../../../common/types/media.types';
import { MediaRepository } from '../media/media.repository';
import { DrizzleService } from '../../drizzle/drizzle.service';
import { DatabaseType } from '../../../db/schema/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { GamesEntity, MediaEntity } from '../../../db/schema/entities';
import { Games, TABLE_GAMES } from '../../../db/schema/tables/content/games';
import { Media } from '../../../db/schema/tables/content/media';
import { eq } from 'drizzle-orm';

@Injectable()
export class GamesRepository {
  constructor(
    private database: DrizzleService,
    private mediaRepository: MediaRepository,
  ) {}

  private get db(): NodePgDatabase<DatabaseType> {
    return this.database.getDatabase();
  }

  async create(data: RequestCreateGameDTO): Promise<MediaWithGames> {
    const result: MediaWithGames = await this.db.transaction(async (tx) => {
      const media: MediaEntity =
        await this.mediaRepository.createWithTransaction(tx, {
          ...data.media,
          type: TABLE_GAMES,
        });
      const games: GamesEntity = await this.createWithTransaction(tx, {
        ...data.games,
        mediaId: media.id,
      });

      return { media, games };
    });

    return result;
  }

  async createWithTransaction(tx, data: InsertGameDTO): Promise<GamesEntity> {
    const [newGame] = await tx.insert(Games).values(data).returning();
    return newGame;
  }

  async findAll(): Promise<MediaWithGames[]> {
    return this.db
      .select()
      .from(Games)
      .innerJoin(Media, eq(Games.mediaId, Media.id));
  }

  async findById(id: number): Promise<MediaWithGames | undefined> {
    const [game] = await this.db
      .select()
      .from(Games)
      .innerJoin(Media, eq(Games.mediaId, Media.id))
      .where(eq(Games.id, id));
    return game;
  }

  async updateById(
    gameId: number,
    mediaId: number,
    data: RequestCreateGameDTO,
  ): Promise<MediaWithGames> {
    const result: MediaWithGames = await this.db.transaction(async (tx) => {
      const media: MediaEntity =
        await this.mediaRepository.updatePlatformWithTransaction(
          tx,
          mediaId,
          data.media,
        );

      const games: GamesEntity = await this.updateWithTransaction(
        tx,
        gameId,
        data.games,
      );
      return { media, games };
    });

    return result;
  }

  async updateWithTransaction(
    tx,
    gameId: number,
    data: CreateGameDTO,
  ): Promise<GamesEntity> {
    const [updatedGame] = await tx
      .update(Games)
      .set({ ...data, updated_at: new Date() })
      .where(eq(Games.id, gameId))
      .returning();

    return updatedGame;
  }
}
