import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDTO) {
    data.password = await argon2.hash(data.password);
    const newUser = await this.userRepository.create(data);

    return { success: true, data: newUser };
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findById(id: number) {
    return this.userRepository.findById(id);
  }

  async update(data: CreateUserDTO) {}

  async delete(id: number) {
    await this.userRepository.deleteById(id);
  }
}
