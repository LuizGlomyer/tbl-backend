import {
  CreateGameDTO,
  RequestCreateGameDTO,
} from '../../src/common/dto/create-game.dto';
import { CreateMediaDTO } from '../../src/common/dto/create-media.dto';
import { MediaWithGames } from '../../src/common/types/media.types';
import { GamesEntity, MediaEntity } from '../../src/db/schema/entities';
import { TABLE_GAMES } from '../../src/db/schema/tables/content/games';

import { GamesRepository } from '../../src/modules/content/games/games.repository';
import { mockPlaystation4 } from './platforms.mocks';

export const GamesRepositoryMock: {
  provide: typeof GamesRepository;
  useValue: Partial<GamesRepository>;
} = {
  provide: GamesRepository,
  useValue: {
    createWithTransaction: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    updateById: jest.fn(),
    updateWithTransaction: jest.fn(),
  },
};

const gameDeathStranding: CreateGameDTO = {
  platformId: mockPlaystation4.platforms.id,
};

const mediaDeathStranding: CreateMediaDTO = {
  name: 'Death Stranding',
  acronym: 'DS',
  description: 'A Hideo Kojima game',
  imageCoverUrl: 'ds.jpg',
  imageUrls: ['1.jpg', '2.jpg'],
};

export const requestDeathStranding: RequestCreateGameDTO = {
  games: gameDeathStranding,
  media: mediaDeathStranding,
};

const entityMediaDeathStranding: MediaEntity = {
  ...mediaDeathStranding,
  id: 8,
  type: TABLE_GAMES,
  updated_at: null,
  created_at: new Date(),
};

const entityGamesDeathStranding: GamesEntity = {
  ...gameDeathStranding,
  id: 9,
  mediaId: entityMediaDeathStranding.id,
  updated_at: null,
  created_at: new Date(),
};

export const mockDeathStranding: MediaWithGames = {
  media: entityMediaDeathStranding,
  games: entityGamesDeathStranding,
};
