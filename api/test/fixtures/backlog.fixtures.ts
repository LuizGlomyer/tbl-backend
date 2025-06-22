import { CreateBacklogDTO } from '../../src/common/dto/core/backlog.dto';
import { BacklogEntity } from '../../src/db/schema/entities';

export const backlogEntity: BacklogEntity = {
  id: 1,
  userMediaId: 1,
  statusId: 1,
  rating: '8.5',
  review: 'Good!',
  reviewContainsSpoilers: false,
  personalCommentary: 'Personal note',
  timeSpent: '10:00:00',
  startDate: null,
  endDate: null,
  created_at: new Date(),
  updated_at: new Date(),
};

export const backlogDTO: CreateBacklogDTO = {
  userMediaId: 1,
  statusId: 1,
  rating: '9.5',
  review: 'Great!',
  reviewContainsSpoilers: false,
  personalCommentary: 'Personal note',
  timeSpent: '15:00:00',
};
