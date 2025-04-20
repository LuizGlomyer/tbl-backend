import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GamesRepository } from './games.repository';
import { RequestCreateGameDTO } from './dto/create-game.dto';
import { MediaWithGames } from '../../../common/types/media.type';
import { PlatformsRepository } from '../platforms/platforms.repository';

@Injectable()
export class GamesService {
  constructor(
    private gamesRepository: GamesRepository,
    private platformsRepository: PlatformsRepository,
  ) {}

  async create(data: RequestCreateGameDTO): Promise<MediaWithGames> {
    await this.validatePlatform(data.games.platformId);
    return this.gamesRepository.create(data);
  }

  async findAll(): Promise<MediaWithGames[]> {
    return this.gamesRepository.findAll();
  }

  async findById(id: number): Promise<MediaWithGames> {
    const game = await this.gamesRepository.findById(id);
    return game;
  }

  async findByIdOrThrow(id: number): Promise<MediaWithGames> {
    const game = await this.findById(id);
    if (!game) throw new NotFoundException();
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

  async validatePlatform(platformId: number): Promise<void> {
    const platform = await this.platformsRepository.findById(platformId);
    if (!platform)
      throw new BadRequestException(
        `There is no platform with id ${platformId}`,
      );
  }
}
