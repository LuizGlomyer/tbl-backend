import { Module } from '@nestjs/common';
import { UserMediaService } from './user-media.service';
import { DrizzleModule } from '../../drizzle/drizzle.module';
import { UserMediaController } from './user-media.controller';
import { UserMediaRepository } from './user-media.repository';
import { MediaModule } from '../../content/media/media.module';
import { UserModule } from '../../user/user.module';

@Module({
  controllers: [UserMediaController],
  providers: [UserMediaService, UserMediaRepository],
  imports: [DrizzleModule, MediaModule, UserModule],
  exports: [UserMediaService, UserMediaRepository],
})
export class UserMediaModule {}
