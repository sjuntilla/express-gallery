const bookshelf = require('../database/bookshelf.js');

class Gallery extends bookshelf.Model {
    get tableName() {
        return 'gallerytable';
    }
    get hasTimestamps() {
        return false;
    }
}

module.exports = bookshelf.model('Gallery', Gallery);