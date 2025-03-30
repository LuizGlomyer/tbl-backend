import { IsArray, IsObject, IsString } from 'class-validator';
import { Media, Relationship } from '../schemas/common';

export const MIN_USERNAME_LENGTH = 8;

export class CreateNodeDTO {
  @IsArray()
  @IsString({ each: true })
  labels: string[];

  @IsObject({})
  node: Media;

  @IsArray({})
  relationships: Relationship[];
}
