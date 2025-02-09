import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as argon2 from 'argon2';
import { UpdateUsenameDTO } from './dto/update-username.dto';
import { AlreadyExistsException } from '../../common/exceptions/already-exists.exception';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDTO) {
    const usernameAlreadyExists = await this.userRepository.findByUsername(
      data.username,
    );
    if (usernameAlreadyExists) throw new AlreadyExistsException('username');

    data.password = await argon2.hash(data.password);
    const newUser = await this.userRepository.create(data);
    return new UserResponseDto(newUser);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async updateUsernameById(id: number, data: UpdateUsenameDTO) {
    this.validateUsername(data.username);

    const userToUpdate = await this.findById(id);
    if (!userToUpdate) throw new ConflictException('This user does not exist');

    const usernameAlreadyExists = await this.userRepository.findByUsername(
      data.username,
    );
    if (usernameAlreadyExists) throw new AlreadyExistsException('username');

    const updatedUser = await this.userRepository.updateUsernameById(id, data);
    return new UserResponseDto(updatedUser);
  }

  async delete(id: number) {
    await this.userRepository.deleteById(id);
  }

  validateUsername(username: string) {
    const minUsernameLength = 8;
    const isValid =
      /^[a-zA-Z0-9_.]+$/.test(username) && username.length >= minUsernameLength;
    if (!isValid) throw new BadRequestException('This username is not valid');
  }
}
