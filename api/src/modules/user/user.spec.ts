import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserResponseDto } from '../../common/dto/user/user-response.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { USERS_MAX_LENGTH_USERNAME } from '../../db/schema/tables/users';
import { UserRepositoryMock } from '../../../test/mocks/user.mocks';
import { NON_EXISTING_ID } from '../../../test/test.utils';
import {
  userMario,
  userSolidSnake,
} from '../../../test/fixtures/user.fixtures';

jest.mock('argon2', () => ({
  hash: () => 'hashed_password',
}));

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepositoryMock],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('creating a new user', () => {
    test('create a valid user', async () => {
      jest.spyOn(userRepository, 'create').mockResolvedValue(userSolidSnake);
      jest.spyOn(userRepository, 'findByUsername').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(undefined);
      const newUser = await service.create(userSolidSnake);

      expect(newUser).toEqual(new UserResponseDto(userSolidSnake));
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith(userSolidSnake);
    });

    test('username has invalid character', async () => {
      const invalidUser = { ...userSolidSnake, username: 'Sº/idSn@ke' };
      jest.spyOn(userRepository, 'create');
      await expect(service.create(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    test('username has less than minimum needed characters', async () => {
      const invalidUser = { ...userSolidSnake, username: 'Solid' };
      jest.spyOn(userRepository, 'create');
      await expect(service.create(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    test('username exceeds maximum characters', async () => {
      const invalidUser = {
        ...userSolidSnake,
        username: 'A'.repeat(USERS_MAX_LENGTH_USERNAME + 1),
      };
      jest.spyOn(userRepository, 'create');
      await expect(service.create(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('finding users', () => {
    test('find a valid user by id', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(userSolidSnake);
      const userFound = await service.findByIdOrThrow(userSolidSnake.id);

      expect(userFound).toEqual(new UserResponseDto(userSolidSnake));
      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(userRepository.findById).toHaveBeenCalledWith(userSolidSnake.id);
    });

    test('find a non existing user by id', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.findByIdOrThrow(NON_EXISTING_ID)).rejects.toThrow(
        NotFoundException,
      );

      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(userRepository.findById).toHaveBeenCalledWith(NON_EXISTING_ID);
    });

    test('find all users', async () => {
      const mockedUsers = [userSolidSnake, userMario];
      jest.spyOn(userRepository, 'findAll').mockResolvedValue(mockedUsers);
      const allUsers = await service.findAll();

      expect(allUsers).toEqual(UserResponseDto.fromList(mockedUsers));
      expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('updating users', () => {
    test('update a valid user by id', async () => {
      const updateDto = {
        username: 'newusername123',
      };
      const updatedUserMock = {
        ...userSolidSnake,
        username: updateDto.username,
      };

      jest
        .spyOn(userRepository, 'updateUsernameById')
        .mockResolvedValue(updatedUserMock);
      jest.spyOn(userRepository, 'findById').mockResolvedValue(userSolidSnake);
      jest.spyOn(userRepository, 'findByUsername').mockResolvedValue(undefined);
      const updatedUser = await service.updateUsernameById(
        userSolidSnake.id,
        updateDto,
      );

      expect(updatedUser).toEqual(new UserResponseDto(updatedUserMock));
      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(userRepository.findById).toHaveBeenCalledWith(userSolidSnake.id);
      expect(userRepository.findByUsername).toHaveBeenCalledTimes(1);
      expect(userRepository.findByUsername).toHaveBeenCalledWith(
        updateDto.username,
      );
      expect(userRepository.updateUsernameById).toHaveBeenCalledTimes(1);
      expect(userRepository.updateUsernameById).toHaveBeenCalledWith(
        userSolidSnake.id,
        updateDto,
      );
    });

    test('update a valid user with an invalid username', async () => {
      const updateDto = {
        username: '!nval!dName&',
      };

      jest.spyOn(userRepository, 'updateUsernameById');
      jest.spyOn(userRepository, 'findById').mockResolvedValue(userSolidSnake);
      jest.spyOn(userRepository, 'findByUsername').mockResolvedValue(undefined);

      await expect(
        service.updateUsernameById(userSolidSnake.id, updateDto),
      ).rejects.toThrow(BadRequestException);

      expect(userRepository.findById).toHaveBeenCalledTimes(0);
      expect(userRepository.findByUsername).toHaveBeenCalledTimes(0);
      expect(userRepository.updateUsernameById).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleting users', () => {
    test('delete an user by id', async () => {
      jest.spyOn(userRepository, 'deleteById');
      jest.spyOn(userRepository, 'findById').mockResolvedValue(userSolidSnake);
      await service.deleteById(userSolidSnake.id);

      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(userRepository.findById).toHaveBeenCalledWith(userSolidSnake.id);
      expect(userRepository.deleteById).toHaveBeenCalledTimes(1);
      expect(userRepository.deleteById).toHaveBeenCalledWith(userSolidSnake.id);
    });

    test('delete a non existing user by id', async () => {
      jest.spyOn(userRepository, 'deleteById');
      jest.spyOn(userRepository, 'findById').mockResolvedValue(undefined);

      await expect(service.deleteById(NON_EXISTING_ID)).rejects.toThrow(
        NotFoundException,
      );

      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(userRepository.findById).toHaveBeenCalledWith(NON_EXISTING_ID);
      expect(userRepository.deleteById).toHaveBeenCalledTimes(0);
    });
  });
});
