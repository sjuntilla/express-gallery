exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('gallerytable').del()
    .then(function () {
      // Inserts seed entries
      return knex('gallerytable').insert([{
          author: 'rowValue1',
          link: "https://i.imgur.com/qstVb3L.jpg",
          description: 'adnfgniasdjkfnm'
        },
        {
          author: 'rowValue2',
          link: "https://i.imgur.com/Sld9dIK.jpg",
          description: 'adnfgniasdjkfnm'
        },
        {
          author: 'rowValue3',
          link: "https://i.imgur.com/K7r98fo.jpg",
          description: 'adnfgniasdjkfnm'
        }
      ]);
    });
};