import { Test, TestingModule } from '@nestjs/testing';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { GamesRepositoryMock } from '../../../../test/mocks/games.mocks';
import { PlatformsRepository } from '../platforms/platforms.repository';
import { NON_EXISTING_ID } from '../../../../test/test.utils';
import { PlatformsRepositoryMock } from '../../../../test/mocks/platforms.mocks';
import { MediaService } from '../media/media.service';
import { MediaServiceMock } from '../../../../test/mocks/media.mocks';
import {
  mockDeathStranding,
  requestDeathStranding,
} from '../../../../test/fixtures/games.fixtures';
import { mockPlaystation4 } from '../../../../test/fixtures/platforms.fixtures';

describe('GamesService', () => {
  let service: GamesService;
  let mediaService: MediaService;
  let gamesRepository: GamesRepository;
  let platformsRepository: PlatformsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        MediaServiceMock,
        GamesRepositoryMock,
        PlatformsRepositoryMock,
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    mediaService = module.get<MediaService>(MediaService);
    gamesRepository = module.get<GamesRepository>(GamesRepository);
    platformsRepository = module.get<PlatformsRepository>(PlatformsRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('creating a new game', () => {
    test('create a valid game', async () => {
      jest
        .spyOn(gamesRepository, 'create')
        .mockResolvedValue(mockDeathStranding);
      jest
        .spyOn(platformsRepository, 'findById')
        .mockResolvedValue(mockPlaystation4);

      const newGame = await service.create(requestDeathStranding);

      expect(newGame).toEqual(mockDeathStranding);
      expect(gamesRepository.create).toHaveBeenCalledTimes(1);
      expect(gamesRepository.create).toHaveBeenCalledWith(
        requestDeathStranding,
      );
    });

    test('create a game with an non existing platform', async () => {
      jest.spyOn(platformsRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.create(requestDeathStranding)).rejects.toThrow(
        BadRequestException,
      );

      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        requestDeathStranding.games.platformId,
      );
      expect(gamesRepository.create).toHaveBeenCalledTimes(0);
    });
  });

  describe('finding games', () => {
    test('find a game by id', async () => {
      jest
        .spyOn(gamesRepository, 'findById')
        .mockResolvedValue(mockDeathStranding);

      const gameFound = await service.findByIdOrThrow(
        mockDeathStranding.games.id,
      );

      expect(gameFound).toEqual(mockDeathStranding);
      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.findById).toHaveBeenCalledWith(
        mockDeathStranding.games.id,
      );
    });

    test('find a non existing game by id', async () => {
      jest.spyOn(gamesRepository, 'findById').mockResolvedValue(undefined);
      await expect(service.findByIdOrThrow(NON_EXISTING_ID)).rejects.toThrow(
        NotFoundException,
      );
      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.findById).toHaveBeenCalledWith(NON_EXISTING_ID);
    });

    test('find all games', async () => {
      const mockedGames = [mockDeathStranding];
      jest.spyOn(gamesRepository, 'findAll').mockResolvedValue(mockedGames);
      const allGames = await service.findAll();

      expect(allGames).toEqual(mockedGames);
      expect(gamesRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('updating games', () => {
    test('update a valid game by id', async () => {
      jest
        .spyOn(gamesRepository, 'updateById')
        .mockResolvedValue(mockDeathStranding);
      jest
        .spyOn(gamesRepository, 'findById')
        .mockResolvedValue(mockDeathStranding);
      jest
        .spyOn(platformsRepository, 'findById')
        .mockResolvedValue(mockPlaystation4);
      const updatedPlatform = await service.updateById(
        mockDeathStranding.games.id,
        requestDeathStranding,
      );

      expect(updatedPlatform).toEqual(mockDeathStranding);
      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        requestDeathStranding.games.platformId,
      );
      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.findById).toHaveBeenCalledWith(
        mockDeathStranding.games.id,
      );
      expect(gamesRepository.updateById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.updateById).toHaveBeenCalledWith(
        mockDeathStranding.games.id,
        mockDeathStranding.media.id,
        requestDeathStranding,
      );
    });

    test('update a non existing game', async () => {
      jest.spyOn(gamesRepository, 'updateById');
      jest.spyOn(gamesRepository, 'findById').mockResolvedValue(undefined);
      await expect(
        service.updateById(NON_EXISTING_ID, requestDeathStranding),
      ).rejects.toThrow(NotFoundException);
      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.updateById).toHaveBeenCalledTimes(0);
    });

    test('update with a non existing platform', async () => {
      jest
        .spyOn(gamesRepository, 'findById')
        .mockResolvedValue(mockDeathStranding);
      jest.spyOn(platformsRepository, 'findById').mockResolvedValue(undefined);

      await expect(
        service.updateById(NON_EXISTING_ID, requestDeathStranding),
      ).rejects.toThrow(BadRequestException);

      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.findById).toHaveBeenCalledWith(NON_EXISTING_ID);
      expect(gamesRepository.updateById).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleting games', () => {
    test('delete game by id', async () => {
      jest
        .spyOn(gamesRepository, 'findById')
        .mockResolvedValue(mockDeathStranding);
      jest.spyOn(mediaService, 'deleteById');

      await service.deleteById(mockDeathStranding.games.id);

      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.findById).toHaveBeenCalledWith(
        mockDeathStranding.games.id,
      );
      expect(mediaService.deleteById).toHaveBeenCalledTimes(1);
      expect(mediaService.deleteById).toHaveBeenCalledWith(
        mockDeathStranding.media.id,
      );
    });

    test('delete a non existing game by id', async () => {
      jest.spyOn(gamesRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.deleteById(NON_EXISTING_ID)).rejects.toThrow(
        NotFoundException,
      );

      expect(gamesRepository.findById).toHaveBeenCalledTimes(1);
      expect(gamesRepository.findById).toHaveBeenCalledWith(NON_EXISTING_ID);
      expect(mediaService.deleteById).toHaveBeenCalledTimes(0);
    });
  });
});
