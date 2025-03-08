import { Company, Genre, Media, Relationship, ReleasedOn, Tag } from './common';
import { Person } from './person';

export interface Game extends Media {
  platforms: GamePlatform[];
  tags: Tag[];
  genres: Genre[];
  developer: Company[];
  publisher: Company[];
  releaseDate: GameReleasedOn[];
  dlc: GameDLC[];
  staff: Person[];
}

export interface GameDLC {}

export type GameStatus =
  | 'PLAYING'
  | 'COMPLETE'
  | 'DROPPED'
  | 'ON_HOLD'
  | 'BACKLOG'
  | 'REPLAY';

export interface PlaysGame extends Relationship {
  status: GameStatus;
  dateStart: Date;
  dateCompletion: Date;
  dateDropped: Date;
  timeToBeat: string;
}

export interface GameReleasedOn extends ReleasedOn {
  platform: GamePlatform;
}

export interface GamePlatform extends Media {
  brand: Company;
  generation: string; // 8th generation etc
  releaseDate: ReleasedOn;
  alternativeVersions: GamePlatform[]; //Xbox series X, S, switch OLED
}
