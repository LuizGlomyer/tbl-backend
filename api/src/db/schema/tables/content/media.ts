import { integer, json, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '../../../helpers';
import {
  GENERIC_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from '../../../../common/constants/database.constants';

export const TABLE_MEDIA = 'media';

export const Media = pgTable(TABLE_MEDIA, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  type: varchar({ length: NAME_MAX_LENGTH }).notNull(),
  name: varchar({ length: NAME_MAX_LENGTH }).notNull(),
  acronym: varchar({ length: GENERIC_MAX_LENGTH }),
  description: text(),
  imageCoverUrl: text(),
  imageUrls: json(),
  ...timestamps,
});
