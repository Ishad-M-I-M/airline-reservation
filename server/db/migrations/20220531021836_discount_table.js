/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  let query = `CREATE TABLE discount (
    type varchar(20) NOT NULL,
    discount decimal(4,2) DEFAULT NULL CHECK (discount >= 0 and discount <= 100),
    primary key (type)
    );`
    return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('discount');
};
