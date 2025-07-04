import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const TABLE_STATUS = 'status';

export const Status = pgTable(TABLE_STATUS, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull().unique(),
});
