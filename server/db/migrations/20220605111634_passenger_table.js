/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    let query = `CREATE TABLE passenger (
        passenger_id varchar(25) NOT NULL,
        name varchar(150) NOT NULL,
        dob date NOT NULL,
        address varchar(255) NOT NULL,
        primary key(passenger_id)
      );`;
      return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("passenger");
};
