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
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './dbschema',
    },
  }
};
