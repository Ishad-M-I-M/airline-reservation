/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    let query = `CREATE TABLE booking(
        passenger_id varchar(25) NOT NULL,
        flight_id int NOT NULL,
        ticket_id int NOT NULL UNIQUE,
        primary key(passenger_id, flight_id),
        constraint foreign key(passenger_id) references passenger(passenger_id),
        constraint foreign key(flight_id) references flight(flight_id),
        constraint foreign key(ticket_id) references ticket(ticket_id)
    );`;
    return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("booking");
};
