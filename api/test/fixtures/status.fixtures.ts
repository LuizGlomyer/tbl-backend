import { StatusEntity } from '../../src/db/schema/entities';

export const statusBacklog: StatusEntity = {
  id: 1,
  name: 'backlog',
};

export const statusInProgress: StatusEntity = {
  id: 2,
  name: 'in-progress',
};
