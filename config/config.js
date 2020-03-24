require('dotenv/config');

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.DATABASE,
    database: process.env.PASSWORD,
    host: process.env.HOST,
    port: 3306,
    dialect: process.env.DIALECT
  },
  test: {
    username: process.env.USERNAME_TEST,
    password: process.env.DATABASE_TEST,
    database: process.env.PASSWORD_TEST,
    host: process.env.HOST_TEST,
    port: 3306,
    dialect: process.env.DIALECT_TEST
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.DATABASE,
    database: process.env.PASSWORD,
    host: process.env.HOST,
    port: 3306,
    dialect: process.env.DIALECT
  }
}
