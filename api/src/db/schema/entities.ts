import { InferSelectModel } from 'drizzle-orm';
import { Users } from './tables/users';
import { Logs } from './tables/logs';
import { Platforms } from './tables/content/platforms';
import { Media } from './tables/content/media';
import { Games } from './tables/content/games';

export type UserEntity = InferSelectModel<typeof Users>;
export type LogEntity = InferSelectModel<typeof Logs>;
export type MediaEntity = InferSelectModel<typeof Media>;
export type PlatformsEntity = InferSelectModel<typeof Platforms>;
export type GamesEntity = InferSelectModel<typeof Games>;
