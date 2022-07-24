/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  let query = `CREATE TABLE aircraft (
    aircraft_id int auto_increment,
    tail_number varchar(10) unique NOT NULL,
    model varchar(50) NOT NULL,
    Economy_seats int DEFAULT NULL check (Economy_seats > 0),
    Business_seats int DEFAULT NULL check (Business_seats > 0),
    Platinum_seats int DEFAULT NULL check (Platinum_seats > 0),
    primary key(aircraft_id)
  );`
  return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("aircraft");
};
