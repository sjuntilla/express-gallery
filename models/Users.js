const bookshelf = require('../database/bookshelf.js');

const Users = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'user_id',
    hasTimestamps: true
})

module.exports = Users;