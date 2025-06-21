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
import { GamesService } from './games.service';
import { RequestCreateGameDTO } from '../../../common/dto/content/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() data: RequestCreateGameDTO) {
    return this.gamesService.create(data);
  }

  @Get()
  async findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.findByIdOrThrow(id);
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) gameId: number,
    @Body() data: RequestCreateGameDTO,
  ) {
    return this.gamesService.updateById(gameId, data);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.deleteById(id);
  }
}
