
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reads', function (table) {
    table.increments('id').primary();
    table.string('read_id').unique().notNullable();
    table.specificType('content', 'TEXT[]').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('reads');
};
