/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('discount').del()
  await knex('discount').insert([
    {type: 'Frequent', discount: '5.00'},
    {type: 'Gold', discount: '9.00'}
  ]);
};
