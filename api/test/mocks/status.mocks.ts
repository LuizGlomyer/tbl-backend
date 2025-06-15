import { StatusRepository } from '../../src/modules/core/status/status.repository';
import { StatusService } from '../../src/modules/core/status/status.service';

export const StatusServiceMock: {
  provide: typeof StatusService;
  useValue: Partial<StatusService>;
} = {
  provide: StatusService,
  useValue: {
    findAll: jest.fn(),
    findByIdOrThrow: jest.fn(),
  },
};

export const StatusRepositoryMock: {
  provide: typeof StatusRepository;
  useValue: Partial<StatusRepository>;
} = {
  provide: StatusRepository,
  useValue: {
    findAll: jest.fn(),
    findById: jest.fn(),
  },
};
