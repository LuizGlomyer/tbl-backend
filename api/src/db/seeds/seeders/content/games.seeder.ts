import {
  requestDeathStranding,
  requestSmashBrosUltimate,
} from '../../../../../test/fixtures/games.fixtures';
import { GamesService } from '../../../../modules/content/games/games.service';
import { TABLE_GAMES } from '../../../schema/tables/content/games';

export class GamesSeeder {
  constructor(
    private gamesService: GamesService,
    private platformIds: { ps4: number; nintendoSwitch: number },
  ) {}

  async seed() {
    console.log(`INSERT ${TABLE_GAMES}`);
    requestDeathStranding.games.platformId = this.platformIds.ps4;
    requestSmashBrosUltimate.games.platformId = this.platformIds.nintendoSwitch;
    await this.gamesService.create(requestDeathStranding);
    await this.gamesService.create(requestSmashBrosUltimate);
  }
}
