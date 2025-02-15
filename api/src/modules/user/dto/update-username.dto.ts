import { IsString, Length } from 'class-validator';
import { MIN_USERNAME_LENGTH } from './create-user.dto';
import { USERS_MAX_LENGTH_USERNAME } from '../../../db/schema/tables/users';

export class UpdateUsenameDTO {
  @IsString()
  @Length(MIN_USERNAME_LENGTH, USERS_MAX_LENGTH_USERNAME)
  username: string;
}
