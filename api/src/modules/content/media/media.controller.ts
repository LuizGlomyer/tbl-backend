import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.findByIdOrThrow(id);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.deleteById(id);
  }
}
