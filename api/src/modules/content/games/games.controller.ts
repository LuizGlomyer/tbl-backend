import { Body, Controller, Get, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDTO } from './dto/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() data: CreateGameDTO) {
    return this.gamesService.create(data);
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
