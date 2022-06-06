/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    let query = `
    create procedure book_ticket( in user_id int, 
                                in passenger_id varchar(25),
                                in flight_id int,
                                in seat_number int,
                                in date datetime,
                                in class varchar(10),
                                in paid decimal(10,2),
                                in is_boarded tinyint,
                                out ticket_id int)
    begin
        start transaction;
            insert into ticket( user_id, date, class, paid, is_boarded) 
            values (user_id, date, class, paid, is_boarded);
            
            select last_insert_id() into ticket_id;
            
            insert into booking
            values ( passenger_id, flight_id, ticket_id);
            
            insert into seat_reservation
            values (flight_id, seat_number, ticket_id);
        commit;
    end;`;
    return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.raw("DROP PROCEDURE IF EXISTS book_ticket;");
};
