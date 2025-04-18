import { MediaWithPlatform } from '../../../../common/types/media.type';
import {
  entityStadia,
  entityVirtualBoy,
  mediaStadia,
  mediaVirtualBoy,
} from '../../media/tests/media.mocks';
import {
  CreatePlatformDTO,
  RequestCreatePlatformDTO,
} from '../dto/create-platform.dto';
import { PlatformsRepository } from '../platforms.repository';

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
    updatePlatformById: jest.fn(),
  },
};

const platformVirtualBoy: CreatePlatformDTO = {
  manufacturer: 'TSMC',
};

const platformStadia: CreatePlatformDTO = {
  manufacturer: 'Intel',
};

export const requestVirtualBoy: RequestCreatePlatformDTO = {
  platforms: platformVirtualBoy,
  media: mediaVirtualBoy,
};

export const requestStadia: RequestCreatePlatformDTO = {
  platforms: platformStadia,
  media: mediaStadia,
};

export const mockVirtualBoy: MediaWithPlatform = {
  media: entityVirtualBoy,
  platforms: {
    ...platformVirtualBoy,
    id: 7,
    mediaId: 5,
    updated_at: null,
    created_at: new Date(),
  },
};

export const mockStadia: MediaWithPlatform = {
  media: entityStadia,
  platforms: {
    ...platformStadia,
    id: 10,
    mediaId: 9,
    updated_at: null,
    created_at: new Date(),
  },
};
