import { UserEntity } from '../../src/db/schema/entities';

export const userMario: UserEntity = {
  id: 1,
  username: 'MarioMario',
  email: 'mario@mushroom-kingdom.com',
  password: 'bingbingwahoo',
  updated_at: null,
  created_at: new Date(),
};

export const userSolidSnake: UserEntity = {
  id: 2,
  username: 'SolidSnake',
  email: 'snake@foxhound.com',
  password: 'keptyouwaitinghuh',
  updated_at: null,
  created_at: new Date(),
};
