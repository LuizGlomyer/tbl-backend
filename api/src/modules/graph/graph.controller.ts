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
    const testPayload = {
      node: {
        labels: ['Game'],
        properties: {
          name: 'The Legend of Zelda - Breath of the Wild',
          acronym: 'BotW',
          description: 'A Zelda game for the Wii U and Switch',
          imageCoverUrl: 'imageCoverUrl',
          imageUrls: ['image1', 'image2'],
        },
      },
      relationships: [
        {
          type: 'DEVELOPED_BY',
          nodeLabels: ['Company'],
          targetId: 'nintendo',
          properties: {
            supportTeam: 'Monolith Software',
            dateBetatest: '10/10/2020',
          },
        },
        {
          type: 'TEST_REL',
          nodeLabels: ['Company'],
          targetId: 'sega',
          properties: {
            supportTeam: 'Monolith Software',
            dateBetatest: '10/10/2020',
          },
        },
      ],
    };
    return this.graphService.create(data);
  }
}
