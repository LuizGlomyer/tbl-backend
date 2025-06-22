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
import { BacklogService } from './backlog.service';
import {
  CreateBacklogDTO,
  UpdateBacklogDTO,
} from '../../../common/dto/core/backlog.dto';

@Controller('backlog')
export class BacklogController {
  constructor(private readonly backlogService: BacklogService) {}

  @Post()
  async create(@Body() data: CreateBacklogDTO) {
    return this.backlogService.create(data);
  }

  @Get()
  async findAll() {
    return this.backlogService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.backlogService.findByIdOrThrow(id);
  }

  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBacklogDTO,
  ) {
    return this.backlogService.updateById(id, data);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.backlogService.deleteById(id);
  }
}
