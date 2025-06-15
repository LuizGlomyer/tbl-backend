import {
  boolean,
  decimal,
  integer,
  interval,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { UserMedia } from './user_media';
import { Status } from './status';
import { timestamps } from '../../../helpers';

export const TABLE_BACKLOG = 'backlog';

export const Backlog = pgTable(TABLE_BACKLOG, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userMediaId: integer()
    .notNull()
    .references(() => UserMedia.id, { onDelete: 'cascade' }),
  statusId: integer()
    .notNull()
    .references(() => Status.id),

  rating: decimal({ precision: 4, scale: 2 }),
  review: text(),
  reviewContainsSpoilers: boolean().default(false),
  personalCommentary: text(),
  timeSpent: interval(),
  startDate: timestamp().defaultNow(),
  endDate: timestamp(),
  ...timestamps,
});

// personal commentary about this backlog
// add specific things to other tables? ex: episodes watched, chapters read, etc.
// games will have to point to the platform used and if is a replay
