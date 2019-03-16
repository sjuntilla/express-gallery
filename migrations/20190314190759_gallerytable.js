exports.up = function (knex, Promise) {
    return knex.schema.createTable('gallerytable', (table) => {
        table.increments();
        table.string('author').notNullable();
        table.string('link').notNullable();
        table.text('description').notNullable();
        table.timestamps(true, true);

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('gallerytable');

};