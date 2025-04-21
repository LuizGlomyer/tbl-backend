import { Test, TestingModule } from '@nestjs/testing';

import { PlatformsService } from './platforms.service';
import { PlatformsRepository } from './platforms.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  mockPlaystation4,
  PlatformsRepositoryMock,
  requestPlaystation4,
} from '../../../../test/mocks/platforms.mocks';
import { NON_EXISTING_ID } from '../../../../test/test.utils';
import { MediaService } from '../media/media.service';
import { MediaServiceMock } from '../../../../test/mocks/media.mocks';

describe('PlatformsService', () => {
  let service: PlatformsService;
  let mediaService: MediaService;
  let platformsRepository: PlatformsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformsService, PlatformsRepositoryMock, MediaServiceMock],
    }).compile();

    service = module.get<PlatformsService>(PlatformsService);
    mediaService = module.get<MediaService>(MediaService);
    platformsRepository = module.get<PlatformsRepository>(PlatformsRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('creating a new platform', () => {
    test('create a valid platform', async () => {
      jest
        .spyOn(platformsRepository, 'create')
        .mockResolvedValue(mockPlaystation4);

      const newPlatform = await service.create(requestPlaystation4);

      expect(newPlatform).toEqual(mockPlaystation4);
      expect(platformsRepository.create).toHaveBeenCalledTimes(1);
      expect(platformsRepository.create).toHaveBeenCalledWith(
        requestPlaystation4,
      );
    });
  });

  describe('finding platforms', () => {
    test('find a platform by id', async () => {
      jest
        .spyOn(platformsRepository, 'findById')
        .mockResolvedValue(mockPlaystation4);
      const platformFound = await service.findByIdOrThrow(
        mockPlaystation4.platforms.id,
      );

      expect(platformFound).toEqual(mockPlaystation4);
      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        mockPlaystation4.platforms.id,
      );
    });

    test('find a non existing platform by id', async () => {
      jest.spyOn(platformsRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.findByIdOrThrow(NON_EXISTING_ID)).rejects.toThrow(
        NotFoundException,
      );

      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        NON_EXISTING_ID,
      );
    });

    test('find all platforms', async () => {
      const mockedPlatforms = [mockPlaystation4];
      jest
        .spyOn(platformsRepository, 'findAll')
        .mockResolvedValue(mockedPlatforms);
      const allPlatforms = await service.findAll();

      expect(allPlatforms).toEqual(mockedPlatforms);
      expect(platformsRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('updating platforms', () => {
    test('update a valid platform by id', async () => {
      jest
        .spyOn(platformsRepository, 'updateById')
        .mockResolvedValue(mockPlaystation4);
      jest
        .spyOn(platformsRepository, 'findById')
        .mockResolvedValue(mockPlaystation4);
      const updatedPlatform = await service.updatePlatformById(
        mockPlaystation4.platforms.id,
        requestPlaystation4,
      );

      expect(updatedPlatform).toEqual(mockPlaystation4);
      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        mockPlaystation4.platforms.id,
      );
      expect(platformsRepository.updateById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.updateById).toHaveBeenCalledWith(
        mockPlaystation4.platforms.id,
        mockPlaystation4.media.id,
        requestPlaystation4,
      );
    });

    test('update a non existing platform by id', async () => {
      jest.spyOn(platformsRepository, 'updateById');
      jest.spyOn(platformsRepository, 'findById').mockResolvedValue(undefined);
      await expect(
        service.updatePlatformById(NON_EXISTING_ID, requestPlaystation4),
      ).rejects.toThrow(NotFoundException);
      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.updateById).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleting platforms', () => {
    test('delete a platform by id', async () => {
      jest
        .spyOn(platformsRepository, 'findById')
        .mockResolvedValue(mockPlaystation4);
      jest
        .spyOn(platformsRepository, 'gamesPlatformCount')
        .mockResolvedValue(0);
      jest.spyOn(mediaService, 'deleteById');

      await service.deleteById(mockPlaystation4.platforms.id);

      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        mockPlaystation4.platforms.id,
      );
      expect(platformsRepository.gamesPlatformCount).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        mockPlaystation4.platforms.id,
      );
      expect(mediaService.deleteById).toHaveBeenCalledTimes(1);
      expect(mediaService.deleteById).toHaveBeenCalledWith(
        mockPlaystation4.media.id,
      );
    });

    test('delete a platform used by other games', async () => {
      jest
        .spyOn(platformsRepository, 'findById')
        .mockResolvedValue(mockPlaystation4);
      jest
        .spyOn(platformsRepository, 'gamesPlatformCount')
        .mockResolvedValue(1);
      jest.spyOn(mediaService, 'deleteById');

      await expect(
        service.deleteById(mockPlaystation4.platforms.id),
      ).rejects.toThrow(ConflictException);

      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        mockPlaystation4.platforms.id,
      );
      expect(platformsRepository.gamesPlatformCount).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        mockPlaystation4.platforms.id,
      );
      expect(mediaService.deleteById).toHaveBeenCalledTimes(0);
    });

    test('delete a non existing platform by id', async () => {
      jest.spyOn(platformsRepository, 'findById').mockResolvedValue(undefined);
      jest
        .spyOn(platformsRepository, 'gamesPlatformCount')
        .mockResolvedValue(1);
      jest.spyOn(mediaService, 'deleteById');

      await expect(
        service.deleteById(mockPlaystation4.platforms.id),
      ).rejects.toThrow(NotFoundException);

      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(
        mockPlaystation4.platforms.id,
      );
      expect(platformsRepository.gamesPlatformCount).toHaveBeenCalledTimes(0);
      expect(mediaService.deleteById).toHaveBeenCalledTimes(0);
    });
  });
});
