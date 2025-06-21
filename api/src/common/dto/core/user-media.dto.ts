import { IsSafeIntId } from '../../decorators/validators';

export class UserMediaDTO {
  @IsSafeIntId()
  userId: number;
  @IsSafeIntId()
  mediaId: number;
  // @IsOptional()
  // @IsSafeIntId()
  // favoriteReviewId?: number;
  // @IsBoolean()
  // isFave: boolean;
}
