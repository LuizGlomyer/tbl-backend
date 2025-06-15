import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusRepository } from './status.repository';
import { DrizzleModule } from '../../drizzle/drizzle.module';
import { StatusController } from './status.controller';

@Module({
  controllers: [StatusController],
  providers: [StatusService, StatusRepository],
  imports: [DrizzleModule],
  exports: [StatusService, StatusRepository],
})
export class StatusModule {}
