import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers';

export const TABLE_USERS = 'users';

const ARGON2ID_HASH_LENGTH = 97;
const MAX_EMAIL_LENGTH = 320;

export const Users = pgTable(TABLE_USERS, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: MAX_EMAIL_LENGTH }).notNull().unique(),
  password: varchar({ length: ARGON2ID_HASH_LENGTH }).notNull(),
  ...timestamps,
});
