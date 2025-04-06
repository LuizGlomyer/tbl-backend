import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';

describe('Games', () => {
  let provider: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesService],
    }).compile();

    provider = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
