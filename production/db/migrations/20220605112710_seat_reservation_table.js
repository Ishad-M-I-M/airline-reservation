/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    let query = `CREATE TABLE seat_reservation(
        flight_id int NOT NULL,
        seat_number int NOT NULL,
        ticket_id int UNIQUE NOT NULL,
        primary key(flight_id, seat_number),
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
    return knex.schema.dropTableIfExists("seat_reservation");
};
