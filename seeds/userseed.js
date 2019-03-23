exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          user_id: '1',
          email: 'juntilla@hawaii.edu',
          password: 'ohfuck'
        },
        {
          user_id: '2',
          email: 'juntilla@hawaii.edu',
          password: 'ohfuck'
        },
        {
          user_id: '3',
          email: 'juntilla@hawaii.edu',
          password: 'ohfuck'
        }
      ]);
    });
};