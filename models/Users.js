const bookshelf = require('../database/bookshelf.js');

const Users = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'user_id',
    hasTimestamps: true
})

module.exports = Users;