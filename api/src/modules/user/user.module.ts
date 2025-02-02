import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [DrizzleModule],
  exports: [UserService],
})
export class UserModule {}
