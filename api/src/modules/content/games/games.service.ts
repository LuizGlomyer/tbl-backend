import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GamesRepository } from './games.repository';
import { RequestCreateGameDTO } from '../../../common/dto/content/create-game.dto';
import { MediaWithGames } from '../../../common/types/media.types';
import { PlatformsRepository } from '../platforms/platforms.repository';
import { MediaService } from '../media/media.service';

@Injectable()
export class GamesService {
  constructor(
    private gamesRepository: GamesRepository,
    private platformsRepository: PlatformsRepository,
    private mediaService: MediaService,
  ) {}

  async create(data: RequestCreateGameDTO): Promise<MediaWithGames> {
    await this.validatePlatform(data.games.platformId);
    return this.gamesRepository.create(data);
  }

  async findAll(): Promise<MediaWithGames[]> {
    return this.gamesRepository.findAll();
  }

  async findById(id: number): Promise<MediaWithGames | undefined> {
    const game = await this.gamesRepository.findById(id);
    return game;
  }

  async findByIdOrThrow(id: number): Promise<MediaWithGames> {
    const game = await this.findById(id);
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async updateById(gameId: number, data: RequestCreateGameDTO) {
    const gameToUpdate = await this.findByIdOrThrow(gameId);
    await this.validatePlatform(data.games.platformId);
    const updatedGame = await this.gamesRepository.updateById(
      gameToUpdate.games.id,
      gameToUpdate.media.id,
      data,
    );
    return updatedGame;
  }

  async deleteById(id: number): Promise<MediaWithGames> {
    const gameToDelete = await this.findByIdOrThrow(id);
    await this.mediaService.deleteById(gameToDelete.media.id);
    return gameToDelete;
  }

  async validatePlatform(platformId: number): Promise<void> {
    const platform = await this.platformsRepository.findById(platformId);
    if (!platform)
      throw new BadRequestException(
        `There is no platform with id ${platformId}`,
      );
  }
}
