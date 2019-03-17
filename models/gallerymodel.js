const bookshelf = require("../database/bookshelf.js");

class Gallery extends bookshelf.Model {
  get tableName() {
    return "gallerytable";
  }
  get hasTimestampts() {
    return true;
  }
}
module.exports = bookshelf.model("Gallery", Gallery);
