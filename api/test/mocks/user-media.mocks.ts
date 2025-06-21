import { UserMediaRepository } from '../../src/modules/core/user-media/user-media.repository';
import { UserMediaService } from '../../src/modules/core/user-media/user-media.service';

export const UserMediaServiceMock: {
  provide: typeof UserMediaService;
  useValue: Partial<UserMediaService>;
} = {
  provide: UserMediaService,
  useValue: {
    findByPrimaryKeyOrElseCreate: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findByPrimaryKeyOrThrow: jest.fn(),
  },
};

export const UserMediaRepositoryMock: {
  provide: typeof UserMediaRepository;
  useValue: Partial<UserMediaRepository>;
} = {
  provide: UserMediaRepository,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPrimaryKey: jest.fn(),
  },
};
