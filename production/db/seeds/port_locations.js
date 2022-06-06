/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("port_location").del();
  await knex("port_location").insert([
    { location: "CGK", parent_id: 11 },
    { location: "DPS", parent_id: 14 },
    { location: "BIA", parent_id: 16 },
    { location: "HRI", parent_id: 18 },
    { location: "DEL", parent_id: 19 },
    { location: "BOM", parent_id: 21 },
    { location: "MAA", parent_id: 23 },
    { location: "BKK", parent_id: 25 },
    { location: "DMK", parent_id: 28 },
    { location: "SIN", parent_id: 30 },
    { location: "Tangerang City", parent_id: 12 },
    { location: "Banten", parent_id: 13 },
    { location: "Indonesia", parent_id: null },
    { location: "Kabupaten Badung", parent_id: 15 },
    { location: "Bali", parent_id: 13 },
    { location: "Katunayake", parent_id: 17 },
    { location: "Sri Lanka", parent_id: null },
    { location: "Hambantota", parent_id: 17 },
    { location: "Delhi", parent_id: 20 },
    { location: "India", parent_id: null },
    { location: "Mumbai", parent_id: 22 },
    { location: "Maharashtra", parent_id: 20 },
    { location: "Chennai", parent_id: 24 },
    { location: "Tamil Nadu", parent_id: 20 },
    { location: "Bang Phli District", parent_id: 26 },
    { location: "Samut Prakan", parent_id: 27 },
    { location: "Thailand", parent_id: null },
    { location: "Don Mueang", parent_id: 29 },
    { location: "Bangkok", parent_id: 27 },
    { location: "Airport Blvd.", parent_id: 31 },
    { location: "Singapore", parent_id: null },
  ]);
};
