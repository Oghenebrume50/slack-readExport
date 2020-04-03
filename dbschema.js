const dbconn =  require('./db');

dbconn.schema.createTable('workspaces', function (table) {
  table.increments();
  table.string('name');
  table.specificType('channels', 'text ARRAY');
  table.timestamps();
});
  
dbconn.schema.createTable('reads', function (table) {
  table.increments();
  table.string('read_id');
  table.specificType('content', 'text ARRAY');
  table.timestamps();
});