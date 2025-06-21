import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RequestCreatePlatformDTO } from '../../../common/dto/content/create-platform.dto';
import { PlatformsService } from './platforms.service';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Post()
  async create(@Body() data: RequestCreatePlatformDTO) {
    return this.platformsService.create(data);
  }

  @Get()
  async findAll() {
    return this.platformsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.platformsService.findByIdOrThrow(id);
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) platformId: number,
    @Body() data: RequestCreatePlatformDTO,
  ) {
    return this.platformsService.updatePlatformById(platformId, data);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.platformsService.deleteById(id);
  }
}
