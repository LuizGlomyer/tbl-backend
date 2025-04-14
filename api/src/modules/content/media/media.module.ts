import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { DrizzleModule } from '../../drizzle/drizzle.module';
import { MediaController } from './media.controller';

@Module({
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
  imports: [DrizzleModule],
  exports: [MediaService, MediaRepository],
})
export class MediaModule {}
