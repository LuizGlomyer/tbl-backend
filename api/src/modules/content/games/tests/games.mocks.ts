import { MediaWithGames } from '../../../../common/types/media.type';
import { GamesEntity, MediaEntity } from '../../../../db/schema/entities';
import { CreateMediaDTO } from '../../media/dto/create-media.dto';
import { CreateGameDTO, RequestCreateGameDTO } from '../dto/create-game.dto';
import { GamesRepository } from '../games.repository';

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

const gameMetroid: CreateGameDTO = {
  platformId: 1,
};

const mediaMetroid: CreateMediaDTO = {
  name: 'Metroid',
  acronym: '',
  description: 'Space hunter shenanigans',
  imageCoverUrl: 'metroid.jpg',
  imageUrls: ['1.jpg', '2.jpg'],
};

export const requestMetroid: RequestCreateGameDTO = {
  games: gameMetroid,
  media: mediaMetroid,
};

const entityMediaMetroid: MediaEntity = {
  ...mediaMetroid,
  id: 5,
  updated_at: null,
  created_at: new Date(),
};

const entityGamesMetroid: GamesEntity = {
  ...gameMetroid,
  id: 7,
  mediaId: 5,
  updated_at: null,
  created_at: new Date(),
};

export const mockMetroid: MediaWithGames = {
  media: entityMediaMetroid,
  games: entityGamesMetroid,
};
