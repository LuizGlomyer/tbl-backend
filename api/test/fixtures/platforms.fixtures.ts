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
  imageCoverUrl: 'https://files.catbox.moe/udgcu0.webp',
  imageUrls: [
    'https://files.catbox.moe/xzmv6u.webp',
    'https://files.catbox.moe/klryjo.jpg',
  ],
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

export const requestNintendoSwitch: RequestCreatePlatformDTO = {
  platforms: {
    manufacturer: 'NVidia',
  },
  media: {
    name: 'Nintendo Switch',
    acronym: 'NS',
    description: 'A console from Nintendo',
    imageCoverUrl: 'https://files.catbox.moe/itgy9p.webp',
    imageUrls: [
      'https://files.catbox.moe/8ukrcp.webp',
      'https://files.catbox.moe/oifvgk.webp',
    ],
  },
};
