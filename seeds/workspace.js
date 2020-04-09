
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('workspaces').del()
    .then(function () {
      // Inserts seed entries
      return knex('workspaces').insert([
        {team_name: 'microverse', team_id: '1j3jwhdjj2', bot_user_id: '3hi3u4j4', bot_id: 'jhjbj3j4k', token: 'ejnjnri3324kj44'},
        {team_name: 'opendve', team_id: '2hh4j34jj32', bot_user_id: '32443nmdf', bot_id: 'fjnkj4jk4', token: '3232y87y32883873href'}
      ]);
    });
};
