import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
};

export const truncateMaxLength = (value: string, maxLength: number) => {
  if (value.length > maxLength) {
    return value.substring(0, maxLength);
  }
  return value;
};
