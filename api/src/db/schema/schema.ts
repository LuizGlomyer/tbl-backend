import { Media } from './tables/content/media';
import { Platforms } from './tables/content/platforms';
import { Logs } from './tables/logs';
import { Users } from './tables/users';

export const DatabaseSchema = { Users, Logs, Media, Platforms };
export type DatabaseType = typeof DatabaseSchema;
