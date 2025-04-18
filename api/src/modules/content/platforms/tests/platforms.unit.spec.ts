import { Test, TestingModule } from '@nestjs/testing';

import {
  mockVirtualBoy,
  requestVirtualBoy,
  PlatformsRepositoryMock,
  mockStadia,
} from './platforms.mocks';

import { PlatformsService } from '../platforms.service';
import { PlatformsRepository } from '../platforms.repository';
import { NotFoundException } from '@nestjs/common';

describe('PlatformsService', () => {
  let platformsService: PlatformsService;
  let platformsRepository: PlatformsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatformsService, PlatformsRepositoryMock],
    }).compile();

    platformsService = module.get<PlatformsService>(PlatformsService);
    platformsRepository = module.get<PlatformsRepository>(PlatformsRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('creating a new platform', () => {
    test('create a valid platform', async () => {
      jest
        .spyOn(platformsRepository, 'create')
        .mockResolvedValue(mockVirtualBoy);

      const newPlatform = await platformsService.create(requestVirtualBoy);

      expect(newPlatform).toEqual(mockVirtualBoy);
      expect(platformsRepository.create).toHaveBeenCalledTimes(1);
      expect(platformsRepository.create).toHaveBeenCalledWith(
        requestVirtualBoy,
      );
    });
  });

  test('return a platform by ID', async () => {
    jest
      .spyOn(platformsRepository, 'findById')
      .mockResolvedValue(mockVirtualBoy);
    const platformFound = await platformsService.findById(7);

    expect(platformFound).toEqual(mockVirtualBoy);
    expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
    expect(platformsRepository.findById).toHaveBeenCalledWith(7);
  });

  test('return all platforms', async () => {
    const mockedPlatforms = [mockVirtualBoy, mockStadia];
    jest
      .spyOn(platformsRepository, 'findAll')
      .mockResolvedValue(mockedPlatforms);
    const allPlatforms = await platformsService.findAll();

    expect(allPlatforms).toEqual(mockedPlatforms);
    expect(platformsRepository.findAll).toHaveBeenCalledTimes(1);
  });

  describe('update platform', () => {
    test('update a valid platform by id', async () => {
      jest
        .spyOn(platformsRepository, 'updatePlatformById')
        .mockResolvedValue(mockVirtualBoy);
      jest
        .spyOn(platformsRepository, 'findById')
        .mockResolvedValue(mockVirtualBoy);
      const updatedPlatform = await platformsService.updatePlatformById(
        7,
        requestVirtualBoy,
      );

      expect(updatedPlatform).toEqual(mockVirtualBoy);
      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.findById).toHaveBeenCalledWith(7);
      expect(platformsRepository.updatePlatformById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.updatePlatformById).toHaveBeenCalledWith(
        7,
        5,
        requestVirtualBoy,
      );
    });

    test('update a valid platform with an invalid id', async () => {
      jest.spyOn(platformsRepository, 'updatePlatformById');
      jest.spyOn(platformsRepository, 'findById').mockResolvedValue(undefined);
      await expect(
        platformsService.updatePlatformById(99, requestVirtualBoy),
      ).rejects.toThrow(NotFoundException);
      expect(platformsRepository.findById).toHaveBeenCalledTimes(1);
      expect(platformsRepository.updatePlatformById).toHaveBeenCalledTimes(0);
    });
  });
});
