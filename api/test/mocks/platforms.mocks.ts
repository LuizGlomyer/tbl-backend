import { MediaWithPlatform } from '../../src/common/types/media.type';
import {
  CreatePlatformDTO,
  RequestCreatePlatformDTO,
} from '../../src/common/dto/create-platform.dto';
import { PlatformsRepository } from '../../src/modules/content/platforms/platforms.repository';
import { MediaEntity, PlatformsEntity } from '../../src/db/schema/entities';
import { CreateMediaDTO } from '../../src/common/dto/create-media.dto';

export const PlatformsRepositoryMock: {
  provide: typeof PlatformsRepository;
  useValue: Partial<PlatformsRepository>;
} = {
  provide: PlatformsRepository,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    createWithTransaction: jest.fn(),
    updateWithTransaction: jest.fn(),
    updateById: jest.fn(),
  },
};

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
