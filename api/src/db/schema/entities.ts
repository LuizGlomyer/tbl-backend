import { InferSelectModel } from 'drizzle-orm';
import { Users } from './users';

export type UserEntity = InferSelectModel<typeof Users>;
