exports.up = function (knex, Promise) {
    return knex.schema.createTable('gallerytable', (table) => {
        table.increments();
        table.string('author').notNullable();
        table.string('link').notNullable();
        table.string('description').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('gallerytable');

};