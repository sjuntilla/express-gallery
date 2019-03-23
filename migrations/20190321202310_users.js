exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.string('user_id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};