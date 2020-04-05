
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workspaces', function (table) {
    table.increments('id').primary();
    table.string('name').unique().notNullable();
    table.specificType('channels', 'TEXT[]').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('workspaces');
};
