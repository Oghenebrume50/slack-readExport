
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reads').del()
    .then(function () {
      // Inserts seed entries
      return knex('reads').insert([
        {read_id: '12234', content: ['fhfhghjghhgh','fhfjhbfjhfjf']},
        {read_id: '23794', content: ['hbhfbhfbhbfjhbfhbjhbghb']}
      ]);
    });
};
