import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { PlatformsModule } from './platforms/platforms.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [GamesModule, PlatformsModule, MediaModule],
  exports: [MediaModule],
})
export class ContentModule {}
