import {
  CreateGameDTO,
  RequestCreateGameDTO,
} from '../../src/common/dto/content/create-game.dto';
import { CreateMediaDTO } from '../../src/common/dto/content/create-media.dto';
import { MediaWithGames } from '../../src/common/types/media.types';
import { GamesEntity, MediaEntity } from '../../src/db/schema/entities';
import { TABLE_GAMES } from '../../src/db/schema/tables/content/games';
import { mockNintendoSwitch, mockPlaystation4 } from './platforms.fixtures';

//#region Death Stranding
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
  id: 3,
  type: TABLE_GAMES,
  updated_at: null,
  created_at: new Date(),
};

const entityGamesDeathStranding: GamesEntity = {
  ...gameDeathStranding,
  id: 1,
  mediaId: entityMediaDeathStranding.id,
  updated_at: null,
  created_at: new Date(),
};

export const mockDeathStranding: MediaWithGames = {
  media: entityMediaDeathStranding,
  games: entityGamesDeathStranding,
};
//#endregion

//#region Smash Bros Ultimate
const gameSmashBrosUltimate: CreateGameDTO = {
  platformId: mockNintendoSwitch.platforms.id,
};

const mediaSmashBrosUltimate: CreateMediaDTO = {
  name: 'Super Smash Bros. Ultimate',
  acronym: 'SMBU',
  description: 'Everyone is here!',
  imageCoverUrl: 'https://files.catbox.moe/gzxdex.jpg',
  imageUrls: [
    'https://files.catbox.moe/31jti8.webp',
    'https://files.catbox.moe/u16xhi.webp',
  ],
};

export const requestSmashBrosUltimate: RequestCreateGameDTO = {
  games: gameSmashBrosUltimate,
  media: mediaSmashBrosUltimate,
};

const entityMediaSmashBrosUltimate: MediaEntity = {
  ...mediaSmashBrosUltimate,
  id: 4,
  type: TABLE_GAMES,
  updated_at: null,
  created_at: new Date(),
};

const entityGamesSmashBrosUltimate: GamesEntity = {
  ...gameSmashBrosUltimate,
  id: 2,
  mediaId: entityMediaSmashBrosUltimate.id,
  updated_at: null,
  created_at: new Date(),
};

export const mockSmashBrosUltimate: MediaWithGames = {
  media: entityMediaSmashBrosUltimate,
  games: entityGamesSmashBrosUltimate,
};
//#endregion
