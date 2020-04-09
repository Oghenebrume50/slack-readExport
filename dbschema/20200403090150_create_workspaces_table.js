
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workspaces', function (table) {
    table.increments('id').primary();
    table.string('team_name').unique().notNullable();
    table.string('team_id').unique().notNullable();
    table.string('token').unique().notNullable();
    table.string('bot_user_id').notNullable();
    table.string('bot_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('workspaces');
};
