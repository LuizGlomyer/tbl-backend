import { Test, TestingModule } from '@nestjs/testing';

import { StatusRepository } from './status.repository';
import { StatusService } from './status.service';
import { NON_EXISTING_ID } from '../../../../test/test.utils';
import { NotFoundException } from '@nestjs/common';
import { StatusRepositoryMock } from '../../../../test/mocks/status.mocks';
import {
  statusEntityBacklog,
  statusEntityInProgress,
} from '../../../../test/fixtures/status.fixtures';

describe('MediaService', () => {
  let service: StatusService;
  let statusRepository: StatusRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusService, StatusRepositoryMock],
    }).compile();

    service = module.get<StatusService>(StatusService);
    statusRepository = module.get<StatusRepository>(StatusRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('finding status', () => {
    test('find status by id', async () => {
      jest
        .spyOn(statusRepository, 'findById')
        .mockResolvedValue(statusEntityBacklog);

      const statusFound = await service.findByIdOrThrow(statusEntityBacklog.id);

      expect(statusFound).toEqual(statusEntityBacklog);
      expect(statusRepository.findById).toHaveBeenCalledTimes(1);
      expect(statusRepository.findById).toHaveBeenCalledWith(
        statusEntityBacklog.id,
      );
    });

    test('find a non existing media by id', async () => {
      jest.spyOn(statusRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.findByIdOrThrow(NON_EXISTING_ID)).rejects.toThrow(
        NotFoundException,
      );

      expect(statusRepository.findById).toHaveBeenCalledTimes(1);
      expect(statusRepository.findById).toHaveBeenCalledWith(NON_EXISTING_ID);
    });

    test('find all status', async () => {
      jest
        .spyOn(statusRepository, 'findAll')
        .mockResolvedValue([statusEntityBacklog, statusEntityInProgress]);

      const mediaFound = await service.findAll();

      expect(statusRepository.findAll).toHaveBeenCalledTimes(1);
      expect(statusRepository.findAll).toHaveBeenCalledWith();
      expect(mediaFound).toEqual([statusEntityBacklog, statusEntityInProgress]);
    });
  });
});
