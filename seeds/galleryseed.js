exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallerytable').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallerytable').insert([{
          author: 'rowValue1',
          link: 'https://link',
          description: 'sweet pic bruh'
        },
        {
          author: 'rowValue2',
          link: 'https://link',
          description: 'sweet pic bruh'
        },
        {
          author: 'rowValue3',
          link: 'https://link',
          description: 'sweet pic bruh'
        }
      ]);
    });
};