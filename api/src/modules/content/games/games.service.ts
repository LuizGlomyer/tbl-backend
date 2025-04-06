import { Injectable } from '@nestjs/common';
import { GamesRepository } from './games.repository';
import { CreateGameDTO } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(private gamesRepository: GamesRepository) {}

  async create(data: CreateGameDTO) {}
}
