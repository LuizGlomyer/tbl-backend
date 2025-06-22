import { UserMediaService } from '../../../../modules/core/user-media/user-media.service';
import { TABLE__USER_MEDIA } from '../../../schema/tables/core/user_media';

export class UserMediaSeeder {
  constructor(private userMediaService: UserMediaService) {}

  async seed() {
    console.log(`INSERT ${TABLE__USER_MEDIA}`);
    await this.userMediaService.create({
      userId: 1,
      mediaId: 2,
    });
    await this.userMediaService.create({
      userId: 1,
      mediaId: 3,
    });
    await this.userMediaService.create({
      userId: 2,
      mediaId: 4,
    });
    await this.userMediaService.create({
      userId: 2,
      mediaId: 1,
    });
    await this.userMediaService.create({
      userId: 2,
      mediaId: 3,
    });
  }
}
