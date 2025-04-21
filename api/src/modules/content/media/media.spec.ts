import { Test, TestingModule } from '@nestjs/testing';

import { MediaRepository } from './media.repository';
import { MediaService } from './media.service';
import {
  genericMedia,
  MediaRepositoryMock,
} from '../../../../test/mocks/media.mocks';
import { NON_EXISTING_ID } from '../../../../test/test.utils';
import { NotFoundException } from '@nestjs/common';

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

  describe('deleting media', () => {
    test('delete media by id', async () => {
      jest.spyOn(mediaRepository, 'deleteById');
      jest.spyOn(mediaRepository, 'findById').mockResolvedValue(genericMedia);
      await service.deleteById(genericMedia.id);

      expect(mediaRepository.findById).toHaveBeenCalledTimes(1);
      expect(mediaRepository.findById).toHaveBeenCalledWith(genericMedia.id);
      expect(mediaRepository.deleteById).toHaveBeenCalledTimes(1);
      expect(mediaRepository.deleteById).toHaveBeenCalledWith(genericMedia.id);
    });

    test('delete a non existing media by id', async () => {
      jest.spyOn(mediaRepository, 'deleteById');
      jest.spyOn(mediaRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.deleteById(NON_EXISTING_ID)).rejects.toThrow(
        NotFoundException,
      );

      expect(mediaRepository.findById).toHaveBeenCalledTimes(1);
      expect(mediaRepository.findById).toHaveBeenCalledWith(NON_EXISTING_ID);
      expect(mediaRepository.deleteById).toHaveBeenCalledTimes(0);
    });
  });
});
