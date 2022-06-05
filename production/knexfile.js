// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'testbairways',
      user:     'root',
      password: '1234'
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
      database: 'bairways',
      user:     'root',
      password: '1234'
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
