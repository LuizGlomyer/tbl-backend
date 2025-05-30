import { Module } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { PlatformsRepository } from './platforms.repository';
import { PlatformsController } from './platforms.controller';
import { DrizzleModule } from '../../drizzle/drizzle.module';
import { MediaModule } from '../media/media.module';
import { MediaService } from '../media/media.service';

@Module({
  controllers: [PlatformsController],
  providers: [PlatformsService, PlatformsRepository, MediaService],
  imports: [DrizzleModule, MediaModule],
  exports: [PlatformsService],
})
export class PlatformsModule {}
