import { InferSelectModel } from 'drizzle-orm';
import { Users } from './tables/users';
import { Logs } from './tables/logs';

export type UserEntity = InferSelectModel<typeof Users>;
export type LogEntity = InferSelectModel<typeof Logs>;
