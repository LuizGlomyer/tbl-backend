import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { GraphService } from './graph.service';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get()
  async getAllNodesWithRelationships() {
    return this.graphService.getAllNodesWithRelationships();
  }

  @Get(':id')
  async getNodeById(@Param('id', ParseUUIDPipe) id: string) {
    return this.graphService.getNodeById(id);
  }

  @Delete(':id')
  async deleteNodeById(@Param('id', ParseUUIDPipe) id: string) {
    return this.graphService.deleteNodeById(id);
  }

  @Post()
  async create(@Body() data) {
    return this.graphService.create(data);
  }
}
