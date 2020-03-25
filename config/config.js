require('dotenv/config');

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_NAME,
    database: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT
  },
  test: {
    username: process.env.DATABASE_USERNAME_TEST,
    password: process.env.DATABASE_TEST_NAME,
    database: process.env.DATABASE_PASSWORD_TEST,
    host: process.env.DATABASE_HOST_TEST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT_TEST
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_NAME,
    database: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT
  }
}
