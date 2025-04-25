import { CreateMediaDTO } from '../../src/common/dto/create-media.dto';
import {
  CreatePlatformDTO,
  RequestCreatePlatformDTO,
} from '../../src/common/dto/create-platform.dto';
import { MediaWithPlatform } from '../../src/common/types/media.types';
import { MediaEntity, PlatformsEntity } from '../../src/db/schema/entities';
import { TABLE_PLATFORMS } from '../../src/db/schema/tables/content/platforms';

const platformPlaystation4: CreatePlatformDTO = {
  manufacturer: 'TSMC',
};

const mediaPlaystation4: CreateMediaDTO = {
  name: 'Playstation 4',
  acronym: 'PS4',
  description: 'A console from Sony',
  imageCoverUrl: 'ps4.jpg',
  imageUrls: ['1.jpg', '2.jpg'],
};

export const requestPlaystation4: RequestCreatePlatformDTO = {
  platforms: platformPlaystation4,
  media: mediaPlaystation4,
};

const entityMediaPlaystation: MediaEntity = {
  ...mediaPlaystation4,
  id: 5,
  type: TABLE_PLATFORMS,
  updated_at: null,
  created_at: new Date(),
};

const entityGamesPlaystation: PlatformsEntity = {
  ...platformPlaystation4,
  id: 7,
  mediaId: entityMediaPlaystation.id,
  updated_at: null,
  created_at: new Date(),
};

export const mockPlaystation4: MediaWithPlatform = {
  media: entityMediaPlaystation,
  platforms: entityGamesPlaystation,
};
