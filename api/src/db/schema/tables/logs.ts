import {
  pgTable,
  varchar,
  timestamp,
  text,
  uuid,
  integer,
  jsonb,
} from 'drizzle-orm/pg-core';

export const LOGS_MAX_LENGTH_LEVEL = 10;
export const LOGS_MAX_LENGTH_CONTEXT = 255;
export const LOGS_MAX_LENGTH_METHOD = 10;
export const LOGS_MAX_LENGTH_URL = 255;

export const Logs = pgTable('logs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  timestamp: timestamp({ withTimezone: true }).notNull(),
  level: varchar({ length: LOGS_MAX_LENGTH_LEVEL }).notNull(),
  message: text().notNull(),
  context: varchar({ length: LOGS_MAX_LENGTH_CONTEXT }).notNull(),
  request_id: uuid(),
  trace_id: uuid(),
  method: varchar({ length: LOGS_MAX_LENGTH_METHOD }),
  url: varchar({ length: LOGS_MAX_LENGTH_URL }),
  error_stack: jsonb(),
});
