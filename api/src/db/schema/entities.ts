import { InferSelectModel } from 'drizzle-orm';
import { Users } from './tables/users';
import { Logs } from './tables/logs';
import { Platforms } from './tables/content/platforms';
import { Media } from './tables/content/media';
import { Games } from './tables/content/games';
import { Status } from './tables/core/status';
import { UserMedia } from './tables/core/user_media';
import { Backlog } from './tables/core/backlog';

export type UserEntity = InferSelectModel<typeof Users>;
export type LogEntity = InferSelectModel<typeof Logs>;
export type MediaEntity = InferSelectModel<typeof Media>;
export type PlatformsEntity = InferSelectModel<typeof Platforms>;
export type GamesEntity = InferSelectModel<typeof Games>;

export type StatusEntity = InferSelectModel<typeof Status>;
export type UserMediaEntity = InferSelectModel<typeof UserMedia>;
export type BacklogEntity = InferSelectModel<typeof Backlog>;
