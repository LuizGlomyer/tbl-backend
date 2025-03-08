import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { GraphRepository } from './graph.repository';

@Module({
  controllers: [GraphController],
  providers: [GraphService, GraphRepository],
  exports: [GraphService],
})
export class GraphModule {}
