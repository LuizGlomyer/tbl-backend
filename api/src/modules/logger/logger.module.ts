import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LogRepository } from './logger.repository';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Global()
@Module({
  imports: [DrizzleModule],
  providers: [LoggerService, LogRepository],
  exports: [LoggerService],
})
export class LoggerModule {}
