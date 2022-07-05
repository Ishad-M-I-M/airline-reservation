// Update with your config settings.
require('dotenv').config({
  path:'.env'
});
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user:     process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      multipleStatements: true
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds",
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user:     process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      multipleStatements: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds",
    },
    useNullAsDefault: true,
  }

};
