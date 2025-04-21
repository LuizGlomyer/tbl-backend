import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDTO,
  MIN_USERNAME_LENGTH,
} from '../../common/dto/user/create-user.dto';
import { UserRepository } from './user.repository';
import * as argon2 from 'argon2';
import { UpdateUsenameDTO } from '../../common/dto/user/update-username.dto';
import { AlreadyExistsException } from '../../common/exceptions/already-exists.exception';
import { UserResponseDto } from '../../common/dto/user/user-response.dto';
import { USERS_MAX_LENGTH_USERNAME } from '../../db/schema/tables/users';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDTO) {
    this.validateUsername(data.username);

    const usernameAlreadyExists = await this.userRepository.findByUsername(
      data.username,
    );
    if (usernameAlreadyExists) throw new AlreadyExistsException('username');

    const emailAlreadyInUse = await this.userRepository.findByEmail(data.email);
    if (emailAlreadyInUse) throw new AlreadyExistsException('email');

    data.password = await argon2.hash(data.password);
    const newUser = await this.userRepository.create(data);
    return UserResponseDto.from(newUser);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return UserResponseDto.fromList(users);
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    return UserResponseDto.from(user);
  }

  async findByIdOrThrow(id: number) {
    const user = await this.findById(id);
    if (!user?.id) throw new NotFoundException();
    return user;
  }

  async updateUsernameById(id: number, data: UpdateUsenameDTO) {
    this.validateUsername(data.username);

    const userToUpdate = await this.userRepository.findById(id);
    if (!userToUpdate) throw new NotFoundException();

    const usernameAlreadyExists = await this.userRepository.findByUsername(
      data.username,
    );
    if (usernameAlreadyExists) throw new AlreadyExistsException('username');

    const updatedUser = await this.userRepository.updateUsernameById(id, data);
    return UserResponseDto.from(updatedUser);
  }

  async deleteById(id: number) {
    const userToDelete = await this.findByIdOrThrow(id);
    const deletedUser = await this.userRepository.deleteById(userToDelete.id);
    return UserResponseDto.from(deletedUser);
  }

  validateUsername(username: string) {
    const isValid =
      /^[a-zA-Z0-9_.]+$/.test(username) &&
      username.length >= MIN_USERNAME_LENGTH &&
      username.length <= USERS_MAX_LENGTH_USERNAME;
    if (!isValid) throw new BadRequestException('This username is not valid');
  }
}
