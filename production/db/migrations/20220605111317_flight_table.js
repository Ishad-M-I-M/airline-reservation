/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  let query = `CREATE TABLE flight (
        flight_id int NOT NULL auto_increment,
        aircraft_id int NOT NULL references aircraft.aircraft_id,
        route_id int NOT NULL references route.route_id,
        takeoff_time datetime NOT NULL,
        departure_time datetime NOT NULL,
        is_active tinyint(1) default 1,
        primary key(flight_id)
      ) ;`;
      return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("flight");
};
