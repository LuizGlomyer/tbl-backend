import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const useTestDB: boolean = Boolean(process.env.USE_TEST_DB);
let databaseUrl: string = '';

if (useTestDB) {
  console.log('Applying changes to the test database...');
  databaseUrl = process.env.TEST_DATABASE_URL!;
} else {
  console.log('Applying changes to the main database...');
  databaseUrl = process.env.DATABASE_URL!;
}

export default defineConfig({
  dialect: 'postgresql',
  schema: [
    './src/db/schema/tables',
    './src/db/schema/tables/content',
    './src/db/schema/tables/core',
  ],
  out: './src/db/migrations',
  dbCredentials: {
    url: databaseUrl,
  },
});
