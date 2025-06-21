import {
  requestNintendoSwitch,
  requestPlaystation4,
} from '../../../../../test/fixtures/platforms.fixtures';
import { PlatformsService } from '../../../../modules/content/platforms/platforms.service';
import { TABLE_PLATFORMS } from '../../../schema/tables/content/platforms';

export class PlatformsSeeder {
  public platformIds: { ps4: number; nintendoSwitch: number };

  constructor(private platformsService: PlatformsService) {}

  async seed() {
    console.log(`INSERT ${TABLE_PLATFORMS}`);
    const ps4 = await this.platformsService.create(requestPlaystation4);
    const nintendoSwitch = await this.platformsService.create(
      requestNintendoSwitch,
    );
    this.platformIds = {
      ps4: ps4.platforms.id,
      nintendoSwitch: nintendoSwitch.platforms.id,
    };
  }
}
