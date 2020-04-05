
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reads').del()
    .then(function () {
      // Inserts seed entries
      return knex('reads').insert([
        {read_id: '12234', 
        content: ['fhfjhkhhhgjhgjh,hgjhjhjhh,kjkk','kjk,bfjhfhfghfhg-gcgcgcgfjf']},
        {read_id: '25794', content: ['hbhfbhfbhbfjhbfhbjhbghb']}
      ]);
    });
};
