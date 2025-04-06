import { MediaEntity, PlatformsEntity } from '../../db/schema/entities';

export interface MediaPlatform {
  media: MediaEntity;
  platforms: PlatformsEntity;
}
