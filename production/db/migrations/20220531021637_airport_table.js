/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  let query = `CREATE TABLE airport (
    airport_id int NOT NULL auto_increment,
    code char(3) NOT NULL unique,
    name varchar(50) NOT NULL,
    primary key(airport_id)
    );`;
  return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('airport');
};
