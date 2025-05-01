import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaFiltersDTO, MediaSearchDTO } from '../../../common/dto/media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async findAll(@Query() params: MediaSearchDTO) {
    return this.mediaService.findAll(params.search);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.findByIdOrThrow(id);
  }

  @Post()
  @HttpCode(200)
  async findByFilters(@Body() filters: MediaFiltersDTO) {
    return this.mediaService.findByFilters(filters);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.deleteById(id);
  }
}
