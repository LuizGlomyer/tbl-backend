import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '../../helpers';

export const TABLE_USERS = 'users';

const ARGON2ID_HASH_LENGTH = 97;
export const USERS_MAX_LENGTH_USERNAME = 255;
export const USERS_MAX_LENGTH_EMAIL = 320;

export const Users = pgTable(TABLE_USERS, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: USERS_MAX_LENGTH_USERNAME }).notNull().unique(),
  email: varchar({ length: USERS_MAX_LENGTH_EMAIL }).notNull().unique(),
  password: varchar({ length: ARGON2ID_HASH_LENGTH }).notNull(),
  ...timestamps,
});
