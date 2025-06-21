/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { PlatformsService } from '../../modules/content/platforms/platforms.service';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { TABLE_USERS } from '../schema/tables/users';
import { TABLE_PLATFORMS } from '../schema/tables/content/platforms';
import { TABLE_GAMES } from '../schema/tables/content/games';
import { TABLE_MEDIA } from '../schema/tables/content/media';
import { INestApplication } from '@nestjs/common';
import { DatabaseType } from '../schema/schema';
import { PlatformsSeeder } from './seeders/content/platforms.seeder';
import { GamesSeeder } from './seeders/content/games.seeder';
import { StatusSeeder } from './seeders/core/status.seeder';
import { UserSeeder } from './seeders/core/users.seeder';
import { TABLE_STATUS } from '../schema/tables/core/status';
import { UserService } from '../../modules/user/user.service';
import { GamesService } from '../../modules/content/games/games.service';
import { UserMediaSeeder } from './seeders/core/user-media.seeder';
import { UserMediaService } from '../../modules/core/user-media/user-media.service';
import { TABLE__USER_MEDIA } from '../schema/tables/core/user_media';

class DatabaseSeeder {
  private app: INestApplication;
  private db: NodePgDatabase<DatabaseType>;

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
      TABLE__USER_MEDIA,
    ];
    for (const table of tables) {
      console.log(`TRUNCATE ${table}`);
      await this.db.execute(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
    }
    console.log('Tables truncated successfully\n');
  }

  public async seed() {
    console.log('--Seeding start');
    await this.truncateTables();

    //#region Core Tables
    const userSeeder = new UserSeeder(this.app.get(UserService));
    await userSeeder.seed();

    const statusSeeder = new StatusSeeder(this.db);
    await statusSeeder.seed();
    //#endregion

    //#region Content Tables
    const platformsSeeder = new PlatformsSeeder(this.app.get(PlatformsService));
    await platformsSeeder.seed();

    const gamesSeeder = new GamesSeeder(
      this.app.get(GamesService),
      platformsSeeder.platformIds,
    );
    await gamesSeeder.seed();
    //#endregion

    const userMediaSeeder = new UserMediaSeeder(this.app.get(UserMediaService));
    await userMediaSeeder.seed();

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
