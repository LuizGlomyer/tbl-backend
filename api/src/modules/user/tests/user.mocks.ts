import { UserEntity } from '../../../db/schema/entities';
import { UserRepository } from '../user.repository';

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

export const userMario: UserEntity = {
  id: 3,
  username: 'MarioMario',
  email: 'mario@mushroom-kingdom.com',
  password: 'bingbingwahoo',
  updated_at: null,
  created_at: new Date(),
};

export const userSolidSnake: UserEntity = {
  id: 5,
  username: 'SolidSnake',
  email: 'snake@foxhound.com',
  password: 'keptyouwaitinghuh',
  updated_at: null,
  created_at: new Date(),
};
