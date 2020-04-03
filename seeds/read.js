
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reads').del()
    .then(function () {
      // Inserts seed entries
      return knex('reads').insert([
        {id: 1, read_id: '12234', content: ['fhfhghjghhgh','fhfjhbfjhfjf']},
        {id: 2, read_id: '23794', content: ['hbhfbhfbhbfjhbfhbjhbghb']}
      ]);
    });
};
