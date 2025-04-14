import { MediaEntity, PlatformsEntity } from '../../db/schema/entities';

export interface MediaWithPlatform {
  media: MediaEntity;
  platforms: PlatformsEntity;
}
