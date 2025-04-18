import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO, MIN_USERNAME_LENGTH } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as argon2 from 'argon2';
import { UpdateUsenameDTO } from './dto/update-username.dto';
import { AlreadyExistsException } from '../../common/exceptions/already-exists.exception';
import { UserResponseDto } from './dto/user-response.dto';
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
    return new UserResponseDto(newUser);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return UserResponseDto.fromList(users);
  }

  async findById(id: number) {
    const foundUser = await this.userRepository.findById(id);
    return new UserResponseDto(foundUser);
  }

  async updateUsernameById(id: number, data: UpdateUsenameDTO) {
    this.validateUsername(data.username);

    const userToUpdate = await this.userRepository.findById(id);
    if (!userToUpdate) throw new NotFoundException('This user does not exist');

    const usernameAlreadyExists = await this.userRepository.findByUsername(
      data.username,
    );
    if (usernameAlreadyExists) throw new AlreadyExistsException('username');

    const updatedUser = await this.userRepository.updateUsernameById(id, data);
    return new UserResponseDto(updatedUser);
  }

  async deleteById(id: number) {
    const userToDelete = await this.findById(id);
    if (!userToDelete.id) throw new NotFoundException();
    const deletedUser = await this.userRepository.deleteById(id);
    return new UserResponseDto(deletedUser);
  }

  validateUsername(username: string) {
    const isValid =
      /^[a-zA-Z0-9_.]+$/.test(username) &&
      username.length >= MIN_USERNAME_LENGTH &&
      username.length <= USERS_MAX_LENGTH_USERNAME;
    if (!isValid) throw new BadRequestException('This username is not valid');
  }
}
