import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserMediaService } from './user-media.service';
import { UserMediaDTO } from '../../../common/dto/core/user-media.dto';

@Controller('user-media')
export class UserMediaController {
  constructor(private readonly userMediaService: UserMediaService) {}

  @Post()
  async findByPrimaryKeyOrElseCreate(@Body() data: UserMediaDTO) {
    return this.userMediaService.findByPrimaryKeyOrElseCreate(data);
  }

  @Get()
  async findAll() {
    return this.userMediaService.findAll();
  }

  @Get('find')
  async findByPrimaryKey(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('mediaId', ParseIntPipe) mediaId: number,
  ) {
    return this.userMediaService.findByPrimaryKeyOrThrow({ userId, mediaId });
  }
}
