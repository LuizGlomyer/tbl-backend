import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUsenameDTO } from './dto/update-username.dto';
import { UserExceptionsFilter } from '../../common/filters/user-exceptions.filter';

// @UseFilters(UserExceptionsFilter)
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
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  async updateUsernameById(
    @Param('id') id: number,
    @Body() data: UpdateUsenameDTO,
  ) {
    return this.userService.updateUsernameById(id, data);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return {
      success: await this.userService.delete(id),
    };
  }
}
