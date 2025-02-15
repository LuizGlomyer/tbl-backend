import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';
import {
  USERS_MAX_LENGTH_EMAIL,
  USERS_MAX_LENGTH_USERNAME,
} from '../../../db/schema/tables/users';

export const MIN_USERNAME_LENGTH = 8;

export class CreateUserDTO {
  @IsString()
  @Length(MIN_USERNAME_LENGTH, USERS_MAX_LENGTH_USERNAME)
  username: string;

  @IsEmail()
  @Length(5, USERS_MAX_LENGTH_EMAIL)
  email: string;

  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
