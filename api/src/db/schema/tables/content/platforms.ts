import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { GENERIC_MAX_LENGTH, timestamps } from '../../../helpers';
import { Media } from './media';

export const TABLE_PLATFORMS = 'platforms';

export const Platforms = pgTable(TABLE_PLATFORMS, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  mediaId: integer()
    .notNull()
    .references(() => Media.id, { onDelete: 'cascade' }),
  manufacturer: varchar({ length: GENERIC_MAX_LENGTH }),
  ...timestamps,
});
