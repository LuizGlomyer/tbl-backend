import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserMediaService } from './user-media.service';
import { UserMediaRepository } from './user-media.repository';
import { MediaService } from '../../content/media/media.service';
import { UserService } from '../../user/user.service';
import { MediaServiceMock } from '../../../../test/mocks/media.mocks';
import { UserServiceMock } from '../../../../test/mocks/user.mocks';
import { UserMediaRepositoryMock } from '../../../../test/mocks/user-media.mocks';
import {
  userMediaDTO,
  userMediaEntity,
} from '../../../../test/fixtures/user-media.fixtures';
import { genericMediaMock } from '../../../../test/fixtures/media.fixtures';
import { userMario } from '../../../../test/fixtures/user.fixtures';
import { UserResponseDto } from '../../../common/dto/user/user-response.dto';

describe('UserMediaService', () => {
  let service: UserMediaService;
  let userMediaRepository: UserMediaRepository;
  let mediaService: MediaService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserMediaService,
        UserMediaRepositoryMock,
        MediaServiceMock,
        UserServiceMock,
      ],
    }).compile();

    service = module.get<UserMediaService>(UserMediaService);
    userMediaRepository = module.get<UserMediaRepository>(UserMediaRepository);
    mediaService = module.get<MediaService>(MediaService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByPrimaryKeyOrElseCreate', () => {
    test('return existing userMedia if found', async () => {
      jest
        .spyOn(userMediaRepository, 'findByPrimaryKey')
        .mockResolvedValue(userMediaEntity);

      const result = await service.findByPrimaryKeyOrElseCreate(userMediaDTO);

      expect(result).toBe(userMediaEntity);
      expect(userMediaRepository.findByPrimaryKey).toHaveBeenCalledWith(
        userMediaDTO.userId,
        userMediaDTO.mediaId,
      );
    });

    test('create userMedia if not found', async () => {
      jest
        .spyOn(userMediaRepository, 'findByPrimaryKey')
        .mockResolvedValue(undefined);
      jest.spyOn(service, 'create').mockResolvedValue(userMediaEntity);

      const result = await service.findByPrimaryKeyOrElseCreate(userMediaDTO);

      expect(service.create).toHaveBeenCalledWith(userMediaDTO);
      expect(result).toBe(userMediaEntity);
    });
  });

  describe('create new userMedia', () => {
    test('should validate, check user/media, and create userMedia', async () => {
      jest
        .spyOn(userService, 'findByIdOrThrow')
        .mockResolvedValue(UserResponseDto.from(userMario)!);
      jest
        .spyOn(mediaService, 'findByIdOrThrow')
        .mockResolvedValue(genericMediaMock);
      jest
        .spyOn(userMediaRepository, 'create')
        .mockResolvedValue(userMediaEntity);

      const result = await service.create(userMediaDTO);

      expect(userService.findByIdOrThrow).toHaveBeenCalledWith(
        userMediaDTO.userId,
      );
      expect(mediaService.findByIdOrThrow).toHaveBeenCalledWith(
        userMediaDTO.mediaId,
      );
      expect(userMediaRepository.create).toHaveBeenCalledWith(userMediaDTO);
      expect(result).toBe(userMediaEntity);
    });
  });

  describe('findAll', () => {
    test('return all userMedia', async () => {
      jest
        .spyOn(userMediaRepository, 'findAll')
        .mockResolvedValue([userMediaEntity]);

      const result = await service.findAll();

      expect(userMediaRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([userMediaEntity]);
    });
  });

  describe('findByPrimaryKeyOrThrow', () => {
    test('return userMedia if found', async () => {
      jest
        .spyOn(userMediaRepository, 'findByPrimaryKey')
        .mockResolvedValue(userMediaEntity);

      const result = await service.findByPrimaryKeyOrThrow(userMediaDTO);

      expect(userMediaRepository.findByPrimaryKey).toHaveBeenCalledWith(
        userMediaDTO.userId,
        userMediaDTO.mediaId,
      );
      expect(result).toBe(userMediaEntity);
    });

    test('throw NotFoundException if not found', async () => {
      jest
        .spyOn(userMediaRepository, 'findByPrimaryKey')
        .mockResolvedValue(undefined);

      await expect(
        service.findByPrimaryKeyOrThrow(userMediaDTO),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
