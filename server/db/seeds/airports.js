/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("airport").del();
  await knex("airport").insert([
    { code: "CGK", name: "Soekarno-Hatta International Airport" },
    { code: "DPS", name: "Ngurah Rai International Airport" },
    { code: "BIA", name: "Bandaranaike International Airport" },
    { code: "HRI", name: "Mattala international airport" },
    { code: "DEL", name: "Indira Gandhi International Airport" },
    { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport" },
    { code: "MAA", name: "Chennai International Airport" },
    { code: "BKK", name: "Suvarnabhumi Airport" },
    { code: "DMK", name: "Don Mueang International Airport" },
    { code: "SIN", name: "Singapore Changi Airport" },
  ]);
};
