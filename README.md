# tbl-backend

To run the project, go into /api and execute:
```bash
pnpm install
pnpm run start:dev

pnpm run start:test # or this for connecting to the test database
```


# CI

Every commit to the main and ci branches undergoes some checks:
- Unit tests
- CodeQL analysis
- SonarCloud quality analysis


# Database

Postgres 17.2 is being used. Drizzle is the ORM handling most of the operations in the API. Schema definitions can be found in [api/src/db/schema](api/src/db). Migrations can be used but aren't because the data model is not yet mature enough. The main database is named "postgres" (for now) and for testing a database named "test" needs to be created. Some useful commands:

```bash
pnpm run push # apply the schema defined in the files into the database
pnpm run push:test # same as above, but for the test database
pnpx drizzle-kit generate 
pnpx drizzle-kit migrate
pnpm drizzle-kit studio # drizzle's own server for simple data operations and visualization
```

There are scripts for seeding placeholder data into the database:
```bash
pnpm run seed
pnpm run seed:test
```


## Data structure

A item from the backlog is a row from its own table (that has specific information) and a row of the <u>media</u> table (for shared fields). This is basically an inheritance implementation. As every query needs a join, I chose to separate things into a MediaEntity and a (Specific)Entity, just like the following example:

```json
{
  "games": {
    "id": 1,
    "mediaId": 3,
    "platformId": 1,
    "created_at": "2025-04-27T19:51:15.231Z",
    "updated_at": null
  },
  "media": {
    "id": 3,
    "type": "games",
    "name": "Death Stranding",
    "acronym": "DS",
    "description": "A Hideo Kojima game",
    "imageCoverUrl": "https://files.catbox.moe/mlbqd6.jpg",
    "imageUrls": [
      "https://files.catbox.moe/64329m.avif",
      "https://files.catbox.moe/5spgmr.avif"
    ],
    "created_at": "2025-04-27T19:51:15.231Z",
    "updated_at": null
  }
}
```


# Tests

## Unit testing

Jest is used to test this project's services. Each test file is located in the folder of the service it references. There are specific folders to put in [mocks](api/test/mocks) for repositories and [fixtures](api/test/fixtures) for test objects.
To run the tests, use:
```bash
pnpm run test
```


## E2E testing

Supertest is used for the requests. All test files are located in [this](api/test/e2e) folder. There is a [utils file](api/test/e2e/_e2e-utils.ts) that has examples of complete and partial object evaluating.

To run the tests, use:
```bash
pnpm run test:e2e
```
