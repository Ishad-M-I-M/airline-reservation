/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('parent_location').del()
  await knex('parent_location').insert([
    { id: 1, parent_id: 2},
    { id: 2, parent_id: 3},
    { id: 4, parent_id: 5},
    { id: 5, parent_id: 3},
    { id: 6, parent_id: 7},
    { id: 8, parent_id: 7},
    { id: 9, parent_id: 10},
    { id: 11, parent_id: 12},
    { id: 12, parent_id: 10},
    { id: 13, parent_id: 14},
    { id: 14, parent_id: 10},
    { id: 15, parent_id: 16},
    { id: 16, parent_id: 17},
    { id: 18, parent_id: 19},
    { id: 19, parent_id: 17},
    { id: 20, parent_id: 21}
  ]);
};
