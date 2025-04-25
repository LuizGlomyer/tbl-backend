/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { PlatformsService } from '../../modules/content/platforms/platforms.service';
import {
  requestNintendoSwitch,
  requestPlaystation4,
} from '../../../test/fixtures/platforms.fixtures';
import { GamesService } from '../../modules/content/games/games.service';
import { UserService } from '../../modules/user/user.service';
import {
  requestDeathStranding,
  requestSmashBrosUltimate,
} from '../../../test/fixtures/games.fixtures';
import {
  userMario,
  userSolidSnake,
} from '../../../test/fixtures/user.fixtures';

async function bootstrap() {
  console.log('seeds.ts');
  const app = await NestFactory.create(AppModule);

  const userService = app.get(UserService);
  const platformsService = app.get(PlatformsService);
  const gamesService = app.get(GamesService);

  const mario = await userService.create(userMario);
  const solidSnake = await userService.create(userSolidSnake);

  const ps4 = await platformsService.create(requestPlaystation4);
  const nintendoSwitch = await platformsService.create(requestNintendoSwitch);

  requestDeathStranding.games.platformId = ps4.platforms.id;
  requestSmashBrosUltimate.games.platformId = nintendoSwitch.platforms.id;
  const deathStranding = await gamesService.create(requestDeathStranding);
  const smashUltimate = await gamesService.create(requestSmashBrosUltimate);

  await app.close();
}

bootstrap();
