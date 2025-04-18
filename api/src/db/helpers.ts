import { timestamp } from 'drizzle-orm/pg-core';

export const NAME_MAX_LENGTH = 500;
export const GENERIC_MAX_LENGTH = 255;

export const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
};

export const truncateMaxLength = (value: string, maxLength: number) => {
  if (value.length > maxLength) {
    return value.substring(0, maxLength);
  }
  return value;
};
