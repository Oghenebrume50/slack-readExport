require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : process.env.Host,
      user : process.env.User,
      password : process.env.Password,
      database : process.env.Database
    },
    migrations: {
      directory: './dbschema',
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
