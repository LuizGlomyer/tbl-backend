import { UserRepository } from '../../src/modules/user/user.repository';
import { UserService } from '../../src/modules/user/user.service';

export const UserServiceMock: {
  provide: typeof UserService;
  useValue: Partial<UserService>;
} = {
  provide: UserService,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdOrThrow: jest.fn(),
    updateUsernameById: jest.fn(),
    deleteById: jest.fn(),
  },
};

export const UserRepositoryMock: {
  provide: typeof UserRepository;
  useValue: Partial<UserRepository>;
} = {
  provide: UserRepository,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByUsername: jest.fn(),
    findByEmail: jest.fn(),
    updateUsernameById: jest.fn(),
    deleteById: jest.fn(),
  },
};
