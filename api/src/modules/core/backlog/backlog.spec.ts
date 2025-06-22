import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BacklogService } from './backlog.service';
import { BacklogRepository } from './backlog.repository';
import { BacklogRepositoryMock } from '../../../../test/mocks/backlog.mocks';
import { StatusService } from '../status/status.service';
import { UserMediaService } from '../user-media/user-media.service';
import { UpdateBacklogDTO } from '../../../common/dto/core/backlog.dto';
import { UserMediaServiceMock } from '../../../../test/mocks/user-media.mocks';
import { StatusServiceMock } from '../../../../test/mocks/status.mocks';
import {
  backlogDTO,
  backlogEntity,
} from '../../../../test/fixtures/backlog.fixtures';
import { userMediaEntity } from '../../../../test/fixtures/user-media.fixtures';
import { statusEntityBacklog } from '../../../../test/fixtures/status.fixtures';

describe('BacklogService', () => {
  let service: BacklogService;
  let backlogRepository: BacklogRepository;
  let userMediaService: UserMediaService;
  let statusService: StatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BacklogService,
        BacklogRepositoryMock,
        UserMediaServiceMock,
        StatusServiceMock,
      ],
    }).compile();

    service = module.get<BacklogService>(BacklogService);
    backlogRepository = module.get<BacklogRepository>(BacklogRepository);
    userMediaService = module.get<UserMediaService>(UserMediaService);
    statusService = module.get<StatusService>(StatusService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    test('create a backlog entry after validating dependencies', async () => {
      jest
        .spyOn(userMediaService, 'findByIdOrThrow')
        .mockResolvedValue(userMediaEntity);
      jest
        .spyOn(statusService, 'findByIdOrThrow')
        .mockResolvedValue(statusEntityBacklog);
      jest.spyOn(backlogRepository, 'create').mockResolvedValue(backlogEntity);

      const result = await service.create(backlogDTO);

      expect(userMediaService.findByIdOrThrow).toHaveBeenCalledWith(
        backlogDTO.userMediaId,
      );
      expect(statusService.findByIdOrThrow).toHaveBeenCalledWith(
        backlogDTO.statusId,
      );
      expect(backlogRepository.create).toHaveBeenCalledWith(backlogDTO);
      expect(result).toBe(backlogEntity);
    });
  });

  describe('findAll', () => {
    test('return all backlog entries', async () => {
      jest
        .spyOn(backlogRepository, 'findAll')
        .mockResolvedValue([backlogEntity]);

      const result = await service.findAll();

      expect(backlogRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([backlogEntity]);
    });
  });

  describe('findByIdOrThrow', () => {
    test('return a backlog entry if found', async () => {
      jest
        .spyOn(backlogRepository, 'findById')
        .mockResolvedValue(backlogEntity);

      const result = await service.findByIdOrThrow(1);

      expect(backlogRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toBe(backlogEntity);
    });

    test('throw NotFoundException if not found', async () => {
      jest.spyOn(backlogRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.findByIdOrThrow(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(backlogRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('updateById', () => {
    test('update a backlog entry after validating dependencies', async () => {
      const dto: UpdateBacklogDTO = {
        statusId: 2,
        rating: '9',
        review: 'Updated review',
        reviewContainsSpoilers: true,
        personalCommentary: 'Updated note',
        timeSpent: '12:00:00',
      };
      jest.spyOn(service, 'findByIdOrThrow').mockResolvedValue(backlogEntity);
      jest
        .spyOn(statusService, 'findByIdOrThrow')
        .mockResolvedValue(statusEntityBacklog);
      jest.spyOn(backlogRepository, 'updateById').mockResolvedValue({
        ...backlogEntity,
        ...dto,
      });

      const result = await service.updateById(1, dto);

      expect(service.findByIdOrThrow).toHaveBeenCalledWith(1);
      expect(statusService.findByIdOrThrow).toHaveBeenCalledWith(dto.statusId);
      expect(backlogRepository.updateById).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual({ ...backlogEntity, ...dto });
    });
  });

  describe('deleteById', () => {
    test('delete a backlog entry and return it', async () => {
      jest.spyOn(service, 'findByIdOrThrow').mockResolvedValue(backlogEntity);
      jest
        .spyOn(backlogRepository, 'deleteById')
        .mockResolvedValue(backlogEntity);

      const result = await service.deleteById(1);

      expect(service.findByIdOrThrow).toHaveBeenCalledWith(1);
      expect(backlogRepository.deleteById).toHaveBeenCalledWith(1);
      expect(result).toBe(backlogEntity);
    });
  });
});
