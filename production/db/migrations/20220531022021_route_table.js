/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  let query = `CREATE TABLE route (
    route_id int NOT NULL auto_increment,
    origin int NOT NULL references airport.airport_id,
    destination int NOT NULL references airport.airport_id,
    primary key(route_id)
  );`
  return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("route");
};
