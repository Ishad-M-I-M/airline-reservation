/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    let query = `CREATE TABLE user (
        user_id int NOT NULL auto_increment,
        email varchar(255) NOT NULL,
        password varchar(100) NOT NULL,
        first_name varchar(100) NOT NULL,
        last_name varchar(100) DEFAULT NULL,
        role varchar(30) NOT NULL CHECK (role in ('moderator','clerk','user','guest')),
        discount_type varchar(20) DEFAULT NULL references discount.type,
        is_active tinyint DEFAULT NULL,
        dob date NOT NULL,
        primary key(user_id)
      );`;
      return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("user");
};
