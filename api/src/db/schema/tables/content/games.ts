import { integer, pgTable } from 'drizzle-orm/pg-core';
import { timestamps } from '../../../helpers';
import { Media } from './media';
import { Platforms } from './platforms';

export const TABLE_GAMES = 'games';

export const Games = pgTable(TABLE_GAMES, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  mediaId: integer()
    .notNull()
    .references(() => Media.id, { onDelete: 'cascade' }),
  platformId: integer()
    .notNull()
    .references(() => Platforms.id),
  ...timestamps,
});
