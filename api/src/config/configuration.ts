export default () => ({
  DB_NAME: process.env.USE_TEST_DB
    ? process.env.TEST_DB_NAME
    : process.env.DB_DATABASE,
});
