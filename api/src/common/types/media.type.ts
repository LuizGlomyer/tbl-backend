import {
  GamesEntity,
  MediaEntity,
  PlatformsEntity,
} from '../../db/schema/entities';

export interface MediaWithPlatform {
  media: MediaEntity;
  platforms: PlatformsEntity;
}

export interface MediaWithGames {
  media: MediaEntity;
  games: GamesEntity;
}
