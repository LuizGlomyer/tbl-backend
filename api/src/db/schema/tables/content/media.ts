import { integer, json, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import {
  GENERIC_MAX_LENGTH,
  NAME_MAX_LENGTH,
  timestamps,
} from '../../../helpers';

export const TABLE_MEDIA = 'media';

export const Media = pgTable(TABLE_MEDIA, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: NAME_MAX_LENGTH }).notNull(),
  acronym: varchar({ length: GENERIC_MAX_LENGTH }),
  description: text(),
  imageCoverUrl: text(),
  imageUrls: json(),
  ...timestamps,
});
