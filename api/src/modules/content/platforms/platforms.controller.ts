import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RequestCreatePlatformDTO } from './dto/create-platform.dto';
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
    return this.platformsService.findById(id);
  }

  @Put(':id')
  async updatePlatformById(
    @Param('id', ParseIntPipe) platformId: number,
    @Body() data: RequestCreatePlatformDTO,
  ) {
    return this.platformsService.updatePlatformById(platformId, data);
  }
}
