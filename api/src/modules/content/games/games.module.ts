import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { GamesController } from './games.controller';
import { DrizzleModule } from '../../drizzle/drizzle.module';

@Module({
  providers: [GamesService, GamesRepository],
  imports: [DrizzleModule],
  exports: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
