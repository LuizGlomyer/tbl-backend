import { Media } from './tables/content/media';
import { PlatformsRelations } from './relations/media-relations';
import { Platforms } from './tables/content/platforms';
import { Logs } from './tables/logs';
import { Users } from './tables/users';
import { Status } from './tables/core/status';
import { UserMedia } from './tables/core/user_media';
import { Backlog } from './tables/core/backlog';

export const DatabaseSchema = {
  Users,
  Logs,
  Media,
  Platforms,
  Status,
  UserMedia,
  Backlog,
  PlatformsRelations,
};
export type DatabaseType = typeof DatabaseSchema;
