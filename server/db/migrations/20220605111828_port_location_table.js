/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    let query = `CREATE TABLE port_location (
        id int NOT NULL auto_increment,
        location varchar(50) NOT NULL unique,
        primary key(id)
      );`;
      return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("port_location");
};
