import { IsString } from 'class-validator';

export class UpdateUsenameDTO {
  @IsString()
  username: string;
}
