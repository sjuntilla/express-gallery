exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallerytable').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallerytable').insert([{
          author: 'rowValue1',
          link: 'adfgad',
          description: 'adnfgniasdjkfnm'
        },
        {
          author: 'rowValue2',
          link: 'adfgad',
          description: 'adnfgniasdjkfnm'
        },
        {
          author: 'rowValue3',
          link: 'adfgad',
          description: 'adnfgniasdjkfnm'
        }
      ]);
    });
};