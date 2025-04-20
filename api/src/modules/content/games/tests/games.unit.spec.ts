import { Test, TestingModule } from '@nestjs/testing';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GamesService } from '../games.service';
import { GamesRepository } from '../games.repository';
import {
  GamesRepositoryMock,
  mockMetroid,
  requestMetroid,
} from './games.mocks';
import {
  mockVirtualBoy,
  PlatformsRepositoryMock,
} from '../../platforms/tests/platforms.mocks';
import { PlatformsRepository } from '../../platforms/platforms.repository';
import { NON_EXISTING_ID } from '../../../../../test/test.utils';

describe('GamesService', () => {
  let service: GamesService;
  let gamesRepository: GamesRepository;
  let platformsRepository: PlatformsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamesService, GamesRepositoryMock, PlatformsRepositoryMock],
    }).compile();

    service = module.get<GamesService>(GamesService);
    gamesRepository = module.get<GamesRepository>(GamesRepository);
    platformsRepository = module.get<PlatformsRepository>(PlatformsRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('creating a new game', () => {
    test('create a valid game', async () => {
      jest.spyOn(gamesRepository, 'create').mockResolvedValue(mockMetroid);
      jest
        .spyOn(platformsRepository, 'findById')
        .mockResolvedValue(mockVirtualBoy);

      const newGame = await service.create(requestMetroid);

      expect(newGame).toEqual(mockMetroid);
      expect(gamesRepository.create).toHaveBeenCalledTimes(1);
      expect(gamesRepository.create).toHaveBeenCalledWith(requestMetroid);
    });

    test('create a game with an non existing platform', async () => {
      jest.spyOn(platformsRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.create(requestMetroid)).rejects.toThrow(
        BadRequestException,
      );

      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        requestMetroid.games.platformId,
      );
      expect(gamesRepository.create).toHaveBeenCalledTimes(0);
    });
  });

  describe('finding games', () => {
    test('find a game by ID', async () => {
      jest.spyOn(gamesRepository, 'findById').mockResolvedValue(mockMetroid);

      const gameFound = await service.findById(mockMetroid.games.id);

      expect(gameFound).toEqual(mockMetroid);
      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.findById).toHaveBeenCalledWith(
        mockMetroid.games.id,
      );
    });

    test('find a non existing game by ID', async () => {
      jest.spyOn(gamesRepository, 'findById').mockResolvedValue(undefined);
      await expect(service.findByIdOrThrow(NON_EXISTING_ID)).rejects.toThrow(
        NotFoundException,
      );
      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
    });

    test('find all games', async () => {
      const mockedGames = [mockMetroid];
      jest.spyOn(gamesRepository, 'findAll').mockResolvedValue(mockedGames);
      const allGames = await service.findAll();

      expect(allGames).toEqual(mockedGames);
      expect(gamesRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('update a game', () => {
    test('update a valid game by id', async () => {
      jest.spyOn(gamesRepository, 'updateById').mockResolvedValue(mockMetroid);
      jest.spyOn(gamesRepository, 'findById').mockResolvedValue(mockMetroid);
      jest
        .spyOn(platformsRepository, 'findById')
        .mockResolvedValue(mockVirtualBoy);
      const updatedPlatform = await service.updateById(
        mockMetroid.games.id,
        requestMetroid,
      );

      expect(updatedPlatform).toEqual(mockMetroid);
      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        requestMetroid.games.platformId,
      );
      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.findById).toHaveBeenCalledWith(
        mockMetroid.games.id,
      );
      expect(gamesRepository.updateById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.updateById).toHaveBeenCalledWith(
        mockMetroid.games.id,
        mockMetroid.media.id,
        requestMetroid,
      );
    });

    test('update a non existing game', async () => {
      jest.spyOn(gamesRepository, 'updateById');
      jest.spyOn(gamesRepository, 'findById').mockResolvedValue(undefined);
      await expect(
        service.updateById(NON_EXISTING_ID, requestMetroid),
      ).rejects.toThrow(NotFoundException);
      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.updateById).toHaveBeenCalledTimes(0);
    });

    test('update with a non existing platform', async () => {
      jest.spyOn(gamesRepository, 'findById').mockResolvedValue(mockMetroid);
      jest.spyOn(platformsRepository, 'findById').mockResolvedValue(undefined);

      await expect(
        service.updateById(NON_EXISTING_ID, requestMetroid),
      ).rejects.toThrow(BadRequestException);

      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.findById).toHaveBeenCalledWith(NON_EXISTING_ID);
      expect(gamesRepository.updateById).toHaveBeenCalledTimes(0);
    });
  });
});
