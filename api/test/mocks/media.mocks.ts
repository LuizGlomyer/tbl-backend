import { MediaRepository } from '../../src/modules/content/media/media.repository';
import { MediaService } from '../../src/modules/content/media/media.service';

export const MediaServiceMock: {
  provide: typeof MediaService;
  useValue: Partial<MediaService>;
} = {
  provide: MediaService,
  useValue: {
    findByIdOrThrow: jest.fn(),
    deleteById: jest.fn(),
  },
};

export const MediaRepositoryMock: {
  provide: typeof MediaRepository;
  useValue: Partial<MediaRepository>;
} = {
  provide: MediaRepository,
  useValue: {
    createWithTransaction: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByFilters: jest.fn(),
    updatePlatformWithTransaction: jest.fn(),
    deleteById: jest.fn(),
  },
};
