import { boolean, integer, pgTable } from 'drizzle-orm/pg-core';
import { Media } from '../content/media';
import { Users } from '../users';
import { timestamps } from '../../../helpers';
import { Backlog } from './backlog';

export const TABLE__USER_MEDIA = 'user_media';

export const UserMedia = pgTable(TABLE__USER_MEDIA, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => Users.id, { onDelete: 'cascade' }),
  mediaId: integer()
    .notNull()
    .references(() => Media.id, { onDelete: 'cascade' }),
  isFavorite: boolean().notNull().default(false),
  favoriteReviewId: integer().references(() => Backlog.id),
  ...timestamps,
});
