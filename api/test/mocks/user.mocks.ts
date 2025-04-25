import { UserRepository } from '../../src/modules/user/user.repository';

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
