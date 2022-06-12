/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("port_location").del();
  await knex("port_location").insert([
    { location: "Tangerang City"},
    { location: "Banten"},
    { location: "Indonesia"},
    { location: "Kabupaten Badung"},
    { location: "Bali"},
    { location: "Katunayake"},
    { location: "Sri Lanka"},
    { location: "Hambantota"},
    { location: "Delhi"},
    { location: "India"},
    { location: "Mumbai"},
    { location: "Maharashtra"},
    { location: "Chennai"},
    { location: "Tamil Nadu"},
    { location: "Bang Phli District"},
    { location: "Samut Prakan"},
    { location: "Thailand"},
    { location: "Don Mueang"},
    { location: "Bangkok"},
    { location: "Airport Blvd."},
    { location: "Singapore"},
  ]);
};
