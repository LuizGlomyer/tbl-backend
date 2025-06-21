import { CreateMediaDTO } from '../../src/common/dto/content/create-media.dto';
import {
  CreatePlatformDTO,
  RequestCreatePlatformDTO,
} from '../../src/common/dto/content/create-platform.dto';
import { MediaWithPlatform } from '../../src/common/types/media.types';
import { MediaEntity, PlatformsEntity } from '../../src/db/schema/entities';
import { TABLE_PLATFORMS } from '../../src/db/schema/tables/content/platforms';

//#region Playstation 4
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
  id: 1,
  type: TABLE_PLATFORMS,
  updated_at: null,
  created_at: new Date(),
};

const entityPlatformsPlaystation: PlatformsEntity = {
  ...platformPlaystation4,
  id: 1,
  mediaId: entityMediaPlaystation.id,
  updated_at: null,
  created_at: new Date(),
};

export const mockPlaystation4: MediaWithPlatform = {
  media: entityMediaPlaystation,
  platforms: entityPlatformsPlaystation,
};
//#endregion

//#region Nintendo Switch
const platformNintendoSwitch: CreatePlatformDTO = {
  manufacturer: 'NVidia',
};

const mediaNintendoSwitch: CreateMediaDTO = {
  name: 'Nintendo Switch',
  acronym: 'NS',
  description: 'A console from Nintendo',
  imageCoverUrl: 'https://files.catbox.moe/itgy9p.webp',
  imageUrls: [
    'https://files.catbox.moe/8ukrcp.webp',
    'https://files.catbox.moe/oifvgk.webp',
  ],
};

export const requestNintendoSwitch: RequestCreatePlatformDTO = {
  platforms: platformNintendoSwitch,
  media: mediaNintendoSwitch,
};

const entityMediaNintendoSwitch: MediaEntity = {
  ...mediaNintendoSwitch,
  id: 2,
  type: TABLE_PLATFORMS,
  updated_at: null,
  created_at: new Date(),
};

const entityPlatformsNintendoSwitch: PlatformsEntity = {
  ...platformNintendoSwitch,
  id: 2,
  mediaId: entityMediaNintendoSwitch.id,
  updated_at: null,
  created_at: new Date(),
};

export const mockNintendoSwitch: MediaWithPlatform = {
  media: entityMediaNintendoSwitch,
  platforms: entityPlatformsNintendoSwitch,
};
//#endregion

//#region Virtual Boy
const platformVirtualBoy: CreatePlatformDTO = {
  manufacturer: 'IBM',
};

const mediaVirtualBoy: CreateMediaDTO = {
  name: 'Virtual Boy',
  acronym: 'VB',
  description: 'A (very red) console from Nintendo',
  imageCoverUrl: '',
  imageUrls: ['', ''],
};

export const requestVirtualBoy: RequestCreatePlatformDTO = {
  platforms: platformVirtualBoy,
  media: mediaVirtualBoy,
};
//#endregion
