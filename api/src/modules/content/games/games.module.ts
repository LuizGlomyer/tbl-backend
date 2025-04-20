import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { GamesController } from './games.controller';
import { DrizzleModule } from '../../drizzle/drizzle.module';
import { MediaModule } from '../media/media.module';
import { PlatformsRepository } from '../platforms/platforms.repository';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GamesRepository, PlatformsRepository],
  imports: [DrizzleModule, MediaModule],
  exports: [GamesService],
})
export class GamesModule {}
