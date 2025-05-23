import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from '../../common/dto/user/create-user.dto';
import { UserService } from './user.service';
import { UpdateUsenameDTO } from '../../common/dto/user/update-username.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findByIdOrThrow(id);
  }

  @Patch(':id')
  async updateUsernameById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUsenameDTO,
  ) {
    return this.userService.updateUsernameById(id, data);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }
}
