/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    let query = `CREATE TABLE ticket (
        ticket_id int NOT NULL auto_increment,
        user_id int NOT NULL,
        date datetime NOT NULL,
        class varchar(10) NOT NULL,
        paid decimal(10,2) NOT NULL,
        is_boarded tinyint DEFAULT NULL,
        primary key(ticket_id),
        constraint foreign key(user_id) references user(user_id)
      );`;
      return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("ticket");
};
