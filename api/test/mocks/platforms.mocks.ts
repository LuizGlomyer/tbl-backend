import { PlatformsRepository } from '../../src/modules/content/platforms/platforms.repository';

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
    gamesPlatformCount: jest.fn(),
  },
};
