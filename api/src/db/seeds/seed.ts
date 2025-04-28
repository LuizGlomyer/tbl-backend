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
import { drizzle } from 'drizzle-orm/node-postgres';
import { TABLE_USERS } from '../schema/tables/users';
import { TABLE_PLATFORMS } from '../schema/tables/content/platforms';
import { TABLE_GAMES } from '../schema/tables/content/games';
import { TABLE_MEDIA } from '../schema/tables/content/media';

async function truncateTables() {
  const useTestDb = process.env.USE_TEST_DB;
  const databaseName = useTestDb
    ? process.env.TEST_DB_NAME!
    : process.env.DB_NAME!;
  const databaseUrl = useTestDb
    ? process.env.TEST_DATABASE_URL!
    : process.env.DATABASE_URL!;
  console.log('--Database: ' + databaseName);

  const db = drizzle(databaseUrl);
  const tables = [TABLE_USERS, TABLE_GAMES, TABLE_PLATFORMS, TABLE_MEDIA];
  for (const table of tables) {
    console.log(`TRUNCATE ${table}`);
    await db.execute(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
  }
}

async function bootstrap() {
  console.log('--Seeding start');
  await truncateTables();

  const app = await NestFactory.create(AppModule);
  const userService = app.get(UserService);
  const platformsService = app.get(PlatformsService);
  const gamesService = app.get(GamesService);

  console.log('INSERT users');
  const mario = await userService.create(userMario);
  const solidSnake = await userService.create(userSolidSnake);

  console.log('INSERT platforms');
  const ps4 = await platformsService.create(requestPlaystation4);
  const nintendoSwitch = await platformsService.create(requestNintendoSwitch);

  console.log('INSERT games');
  requestDeathStranding.games.platformId = ps4.platforms.id;
  requestSmashBrosUltimate.games.platformId = nintendoSwitch.platforms.id;
  const deathStranding = await gamesService.create(requestDeathStranding);
  const smashUltimate = await gamesService.create(requestSmashBrosUltimate);

  console.log('--Seeding end');
  await app.close();
}

bootstrap();
