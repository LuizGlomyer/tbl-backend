import { InferSelectModel } from 'drizzle-orm';
import { Users } from './entities/users';

export type UserEntity = InferSelectModel<typeof Users>;
