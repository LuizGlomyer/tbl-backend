import { GamesRepository } from '../../src/modules/content/games/games.repository';

export const GamesRepositoryMock: {
  provide: typeof GamesRepository;
  useValue: Partial<GamesRepository>;
} = {
  provide: GamesRepository,
  useValue: {
    createWithTransaction: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    updateById: jest.fn(),
    updateWithTransaction: jest.fn(),
  },
};
