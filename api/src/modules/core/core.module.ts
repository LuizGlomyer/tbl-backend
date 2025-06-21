import { Module } from '@nestjs/common';
import { StatusModule } from './status/status.module';
import { UserMediaModule } from './user-media/user-media.module';

@Module({
  imports: [StatusModule, UserMediaModule],
  exports: [StatusModule],
})
export class CoreModule {}
