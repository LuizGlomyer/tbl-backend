import { Module } from '@nestjs/common';
import { StatusModule } from './status/status.module';
import { UserMediaModule } from './user-media/user-media.module';
import { BacklogModule } from './backlog/backlog.module';

@Module({
  imports: [StatusModule, UserMediaModule, BacklogModule],
  exports: [StatusModule],
})
export class CoreModule {}
