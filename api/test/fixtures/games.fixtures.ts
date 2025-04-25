import {
  CreateGameDTO,
  RequestCreateGameDTO,
} from '../../src/common/dto/create-game.dto';
import { CreateMediaDTO } from '../../src/common/dto/create-media.dto';
import { MediaWithGames } from '../../src/common/types/media.types';
import { GamesEntity, MediaEntity } from '../../src/db/schema/entities';
import { TABLE_GAMES } from '../../src/db/schema/tables/content/games';
import { mockPlaystation4 } from './platforms.fixtures';

const gameDeathStranding: CreateGameDTO = {
  platformId: mockPlaystation4.platforms.id,
};

const mediaDeathStranding: CreateMediaDTO = {
  name: 'Death Stranding',
  acronym: 'DS',
  description: 'A Hideo Kojima game',
  imageCoverUrl: 'https://files.catbox.moe/mlbqd6.jpg',
  imageUrls: [
    'https://files.catbox.moe/64329m.avif',
    'https://files.catbox.moe/5spgmr.avif',
  ],
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

export const requestSmashBrosUltimate: RequestCreateGameDTO = {
  games: {
    platformId: 1,
  },
  media: {
    name: 'Super Smash Bros. Ultimate',
    acronym: 'SMBU',
    description: 'Everyone is here!',
    imageCoverUrl: 'https://files.catbox.moe/gzxdex.jpg',
    imageUrls: [
      'https://files.catbox.moe/31jti8.webp',
      'https://files.catbox.moe/u16xhi.webp',
    ],
  },
};
