import { BacklogRepository } from '../../src/modules/core/backlog/backlog.repository';
import { BacklogService } from '../../src/modules/core/backlog/backlog.service';

export const BacklogServiceMock: {
  provide: typeof BacklogService;
  useValue: Partial<BacklogService>;
} = {
  provide: BacklogService,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByIdOrThrow: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  },
};

export const BacklogRepositoryMock: {
  provide: typeof BacklogRepository;
  useValue: Partial<BacklogRepository>;
} = {
  provide: BacklogRepository,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  },
};
