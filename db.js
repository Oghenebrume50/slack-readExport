knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'raphael',
    password : 'open',
    database : 'readExport'
  }
});

module.exports = knex;

