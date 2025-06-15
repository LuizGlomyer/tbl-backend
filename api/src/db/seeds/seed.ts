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
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { TABLE_USERS } from '../schema/tables/users';
import { TABLE_PLATFORMS } from '../schema/tables/content/platforms';
import { TABLE_GAMES } from '../schema/tables/content/games';
import { TABLE_MEDIA } from '../schema/tables/content/media';
import { INestApplication } from '@nestjs/common';
import { DatabaseType } from '../schema/schema';
import { Status, TABLE_STATUS } from '../schema/tables/core/status';
import { StatusEntity } from '../schema/entities';

class DatabaseSeeder {
  private app: INestApplication;
  private db: NodePgDatabase<DatabaseType>;
  private idPs4: number;
  private idNintendoSwitch: number;
  private status: StatusEntity[];

  constructor(app: INestApplication) {
    this.app = app;

    const useTestDb = process.env.USE_TEST_DB;
    const databaseName = useTestDb
      ? process.env.TEST_DB_NAME!
      : process.env.DB_NAME!;
    const databaseUrl = useTestDb
      ? process.env.TEST_DATABASE_URL!
      : process.env.DATABASE_URL!;

    console.log('--Database: ' + databaseName);
    this.db = drizzle(databaseUrl);
  }

  private async truncateTables() {
    const tables = [
      TABLE_USERS,
      TABLE_GAMES,
      TABLE_PLATFORMS,
      TABLE_MEDIA,
      TABLE_STATUS,
    ];
    for (const table of tables) {
      console.log(`TRUNCATE ${table}`);
      await this.db.execute(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
    }
    console.log('Tables truncated successfully\n');
  }

  private async insertUsers() {
    console.log('INSERT users');
    const userService = this.app.get(UserService);
    const mario = await userService.create(userMario);
    const solidSnake = await userService.create(userSolidSnake);
  }

  private async insertPlatforms() {
    console.log('INSERT platforms');
    const platformsService = this.app.get(PlatformsService);
    const ps4 = await platformsService.create(requestPlaystation4);
    const nintendoSwitch = await platformsService.create(requestNintendoSwitch);
    this.idPs4 = ps4.platforms.id;
    this.idNintendoSwitch = nintendoSwitch.platforms.id;
  }

  private async insertGames() {
    console.log('INSERT games');
    const gamesService = this.app.get(GamesService);
    requestDeathStranding.games.platformId = this.idPs4;
    requestSmashBrosUltimate.games.platformId = this.idNintendoSwitch;
    const deathStranding = await gamesService.create(requestDeathStranding);
    const smashUltimate = await gamesService.create(requestSmashBrosUltimate);
  }

  private async insertStatus() {
    console.log('INSERT status');

    this.status = await this.db
      .insert(Status)
      .values([
        { name: 'backlog' },
        { name: 'in-progress' },
        { name: 'completed' },
        { name: 'on-hold' },
        { name: 'dropped' },
        { name: 'playing' },
        { name: 'watching' },
        { name: 'listening' },
        { name: 'reading' },
      ])
      .returning();
  }

  public async seed() {
    console.log('--Seeding start');

    await this.truncateTables();
    await this.insertUsers();
    await this.insertPlatforms();
    await this.insertGames();

    await this.insertStatus();

    console.log('--Seeding end');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const databaseSeeder = new DatabaseSeeder(app);
  await databaseSeeder.seed();
  await app.close();
}

bootstrap();
