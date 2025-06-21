import { UserMediaDTO } from '../../src/common/dto/core/user-media.dto';
import { UserMediaEntity } from '../../src/db/schema/entities';

export const userMediaEntity: UserMediaEntity = {
  id: 1,
  userId: 1,
  mediaId: 2,
  isFavorite: false,
  favoriteReviewId: null,
  created_at: new Date(),
  updated_at: new Date(),
};

export const userMediaDTO: UserMediaDTO = {
  userId: 1,
  mediaId: 2,
};
