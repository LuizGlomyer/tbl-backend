import { Test, TestingModule } from '@nestjs/testing';

import { MediaRepository } from './media.repository';
import { MediaService } from './media.service';
import { MediaRepositoryMock } from '../../../../test/mocks/media.mocks';
import { NON_EXISTING_ID } from '../../../../test/test.utils';
import { NotFoundException } from '@nestjs/common';
import { genericMediaMock } from '../../../../test/fixtures/media.fixtures';

describe('MediaService', () => {
  let service: MediaService;
  let mediaRepository: MediaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaService, MediaRepositoryMock],
    }).compile();

    service = module.get<MediaService>(MediaService);
    mediaRepository = module.get<MediaRepository>(MediaRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('finding media', () => {
    test('find media by id', async () => {
      jest
        .spyOn(mediaRepository, 'findById')
        .mockResolvedValue(genericMediaMock);

      const mediaFound = await service.findByIdOrThrow(genericMediaMock.id);

      expect(mediaFound).toEqual(genericMediaMock);
      expect(mediaRepository.findById).toHaveBeenCalledTimes(1);
      expect(mediaRepository.findById).toHaveBeenCalledWith(
        genericMediaMock.id,
      );
    });

    test('find a non existing media by id', async () => {
      jest.spyOn(mediaRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.findByIdOrThrow(NON_EXISTING_ID)).rejects.toThrow(
        NotFoundException,
      );

      expect(mediaRepository.findById).toHaveBeenCalledTimes(1);
      expect(mediaRepository.findById).toHaveBeenCalledWith(NON_EXISTING_ID);
    });

    test('find all media using a search', async () => {
      jest
        .spyOn(mediaRepository, 'findAll')
        .mockResolvedValue([genericMediaMock]);

      const mediaFound = await service.findAll('');

      expect(mediaRepository.findAll).toHaveBeenCalledTimes(1);
      expect(mediaRepository.findAll).toHaveBeenCalledWith('');
      expect(mediaFound).toEqual([genericMediaMock]);
    });

    test('find media by filters', async () => {
      jest
        .spyOn(mediaRepository, 'findByFilters')
        .mockResolvedValue([genericMediaMock]);

      const mediaFound = await service.findByFilters({});

      expect(mediaRepository.findByFilters).toHaveBeenCalledTimes(1);
      expect(mediaRepository.findByFilters).toHaveBeenCalledWith({});
      expect(mediaFound).toEqual([genericMediaMock]);
    });
  });

  describe('deleting media', () => {
    test('delete media by id', async () => {
      jest
        .spyOn(mediaRepository, 'findById')
        .mockResolvedValue(genericMediaMock);

      await service.deleteById(genericMediaMock.id);

      expect(mediaRepository.deleteById).toHaveBeenCalledTimes(1);
      expect(mediaRepository.deleteById).toHaveBeenCalledWith(
        genericMediaMock.id,
      );
    });
  });
});
