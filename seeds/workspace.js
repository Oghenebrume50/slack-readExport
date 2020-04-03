
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('workspaces').del()
    .then(function () {
      // Inserts seed entries
      return knex('workspaces').insert([
        {name: 'microverse', channels: ['ejnjnri33','24kj44']},
        {name: 'opendve', channels: ['3232y87y328','83873href']}
      ]);
    });
};
