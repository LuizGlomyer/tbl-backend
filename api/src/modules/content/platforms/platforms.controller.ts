import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlatformDTO } from './dto/create-platform.dto';
import { PlatformsService } from './platforms.service';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Post()
  async create(@Body() data: CreatePlatformDTO) {
    return this.platformsService.create(data);
  }

  @Get()
  async findAll() {
    return this.platformsService.findAll();
  }

  // @Get()
  // async findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // async findById(@Param('id', ParseIntPipe) id: number) {
  //   return this.userService.findById(id);
  // }

  // @Patch(':id')
  // async updateUsernameById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() data: UpdateUsenameDTO,
  // ) {
  //   return this.userService.updateUsernameById(id, data);
  // }

  // @Delete(':id')
  // async deleteById(@Param('id', ParseIntPipe) id: number) {
  //   return {
  //     success: await this.userService.deleteById(id),
  //   };
  // }
}
