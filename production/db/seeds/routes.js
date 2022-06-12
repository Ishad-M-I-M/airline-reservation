/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("route").del();
  await knex("route").insert([
    { origin: 1, destination: 2 },
    { origin: 1, destination: 3 },
    { origin: 1, destination: 4 },
    { origin: 1, destination: 5 },
    { origin: 1, destination: 6 },
    { origin: 1, destination: 7 },
    { origin: 1, destination: 8 },
    { origin: 1, destination: 9 },
    { origin: 1, destination: 10 },
    { origin: 2, destination: 1 },
    { origin: 2, destination: 3 },
    { origin: 2, destination: 4 },
    { origin: 2, destination: 5 },
    { origin: 2, destination: 6 },
    { origin: 2, destination: 7 },
    { origin: 2, destination: 8 },
    { origin: 2, destination: 9 },
    { origin: 2, destination: 10 },
    { origin: 3, destination: 1 },
    { origin: 3, destination: 2 },
    { origin: 3, destination: 4 },
    { origin: 3, destination: 5 },
    { origin: 3, destination: 6 },
    { origin: 3, destination: 7 },
    { origin: 3, destination: 8 },
    { origin: 3, destination: 9 },
    { origin: 3, destination: 10 },
    { origin: 4, destination: 1 },
    { origin: 4, destination: 2 },
    { origin: 4, destination: 3 },
    { origin: 4, destination: 5 },
    { origin: 4, destination: 6 },
    { origin: 4, destination: 7 },
    { origin: 4, destination: 8 },
    { origin: 4, destination: 9 },
    { origin: 4, destination: 10 },
    { origin: 5, destination: 1 },
    { origin: 5, destination: 2 },
    { origin: 5, destination: 3 },
    { origin: 5, destination: 4 },
    { origin: 5, destination: 6 },
    { origin: 5, destination: 7 },
    { origin: 5, destination: 8 },
    { origin: 5, destination: 9 },
    { origin: 5, destination: 10 },
    { origin: 6, destination: 1 },
    { origin: 6, destination: 2 },
    { origin: 6, destination: 3 },
    { origin: 6, destination: 4 },
    { origin: 6, destination: 5 },
    { origin: 6, destination: 7 },
    { origin: 6, destination: 8 },
    { origin: 6, destination: 9 },
    { origin: 6, destination: 10 },
    { origin: 7, destination: 1 },
    { origin: 7, destination: 2 },
    { origin: 7, destination: 3 },
    { origin: 7, destination: 4 },
    { origin: 7, destination: 5 },
    { origin: 7, destination: 6 },
    { origin: 7, destination: 8 },
    { origin: 7, destination: 9 },
    { origin: 7, destination: 10 },
    { origin: 8, destination: 1 },
    { origin: 8, destination: 2 },
    { origin: 8, destination: 3 },
    { origin: 8, destination: 4 },
    { origin: 8, destination: 5 },
    { origin: 8, destination: 6 },
    { origin: 8, destination: 7 },
    { origin: 8, destination: 9 },
    { origin: 8, destination: 10 },
    { origin: 9, destination: 1 },
    { origin: 9, destination: 2 },
    { origin: 9, destination: 3 },
    { origin: 9, destination: 4 },
    { origin: 9, destination: 5 },
    { origin: 9, destination: 6 },
    { origin: 9, destination: 7 },
    { origin: 9, destination: 8 },
    { origin: 9, destination: 10 },
    { origin: 10, destination: 1 },
    { origin: 10, destination: 2 },
    { origin: 10, destination: 3 },
    { origin: 10, destination: 4 },
    { origin: 10, destination: 5 },
    { origin: 10, destination: 6 },
    { origin: 10, destination: 7 },
    { origin: 10, destination: 8 },
    { origin: 10, destination: 9 },
  ]);
};