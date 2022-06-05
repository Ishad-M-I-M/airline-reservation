/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  let query = `CREATE TABLE flight_cost (
    flight_id int NOT NULL references flight.flight_id,
    class varchar(10) NOT NULL CHECK (class in ('platinum','business','economy')),
    cost decimal(10,2) NOT NULL,
    primary key( flight_id, class)
  ) ;`;
  return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("flight_cost");
};
