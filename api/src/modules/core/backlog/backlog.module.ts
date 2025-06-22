import { Module } from '@nestjs/common';

import { DrizzleModule } from '../../drizzle/drizzle.module';
import { BacklogController } from './backlog.controller';
import { BacklogService } from './backlog.service';
import { BacklogRepository } from './backlog.repository';
import { UserMediaModule } from '../user-media/user-media.module';
import { StatusModule } from '../status/status.module';

@Module({
  controllers: [BacklogController],
  providers: [BacklogService, BacklogRepository],
  imports: [DrizzleModule, UserMediaModule, StatusModule],
  exports: [BacklogService, BacklogRepository],
})
export class BacklogModule {}
