const knex = require('./index.js');
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;