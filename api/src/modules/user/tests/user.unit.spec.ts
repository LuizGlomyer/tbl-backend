import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { userMario, UserRepositoryMock, userSolidSnake } from './user.mocks';
import { UserResponseDto } from '../dto/user-response.dto';
import { BadRequestException } from '@nestjs/common';
import { USERS_MAX_LENGTH_USERNAME } from '../../../db/schema/tables/users';

jest.mock('argon2', () => ({
  hash: () => 'hashed_password',
}));

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
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
      const newUser = await userService.create(userSolidSnake);

      expect(newUser).toEqual(new UserResponseDto(userSolidSnake));
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith(userSolidSnake);
    });

    test('username has invalid character', async () => {
      const invalidUser = { ...userSolidSnake, username: 'Sº/idSn@ke' };
      jest.spyOn(userRepository, 'create');
      await expect(userService.create(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    test('username has less than minimum needed characters', async () => {
      const invalidUser = { ...userSolidSnake, username: 'Solid' };
      jest.spyOn(userRepository, 'create');
      await expect(userService.create(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    test('username exceeds maximum characters', async () => {
      const invalidUser = {
        ...userSolidSnake,
        username: 'A'.repeat(USERS_MAX_LENGTH_USERNAME + 1),
      };
      jest.spyOn(userRepository, 'create');
      await expect(userService.create(invalidUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  test('return a user by ID', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValue(userSolidSnake);
    const userFound = await userService.findById(5);

    expect(userFound).toEqual(new UserResponseDto(userSolidSnake));
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
    expect(userRepository.findById).toHaveBeenCalledWith(5);
  });

  test('return all users', async () => {
    const mockedUsers = [userSolidSnake, userMario];
    jest.spyOn(userRepository, 'findAll').mockResolvedValue(mockedUsers);
    const allUsers = await userService.findAll();

    expect(allUsers).toEqual(UserResponseDto.fromList(mockedUsers));
    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
  });

  describe('update user', () => {
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
      const updatedUser = await userService.updateUsernameById(5, updateDto);

      expect(updatedUser).toEqual(new UserResponseDto(updatedUserMock));
      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(userRepository.findById).toHaveBeenCalledWith(5);
      expect(userRepository.findByUsername).toHaveBeenCalledTimes(1);
      expect(userRepository.findByUsername).toHaveBeenCalledWith(
        updateDto.username,
      );
      expect(userRepository.updateUsernameById).toHaveBeenCalledTimes(1);
      expect(userRepository.updateUsernameById).toHaveBeenCalledWith(
        5,
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
        userService.updateUsernameById(5, updateDto),
      ).rejects.toThrow(BadRequestException);

      expect(userRepository.findById).toHaveBeenCalledTimes(0);
      expect(userRepository.findByUsername).toHaveBeenCalledTimes(0);
      expect(userRepository.updateUsernameById).toHaveBeenCalledTimes(0);
    });
  });

  test('delete user by id', async () => {
    jest.spyOn(userRepository, 'deleteById');
    jest.spyOn(userRepository, 'findById').mockResolvedValue(userSolidSnake);
    await userService.deleteById(5);

    expect(userRepository.findById).toHaveBeenCalledTimes(1);
    expect(userRepository.findById).toHaveBeenCalledWith(5);
    expect(userRepository.deleteById).toHaveBeenCalledTimes(1);
    expect(userRepository.deleteById).toHaveBeenCalledWith(5);
  });
});
