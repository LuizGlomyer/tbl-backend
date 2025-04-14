import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.deleteById(id);
  }
}
