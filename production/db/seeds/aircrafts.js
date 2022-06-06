/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("aircraft").del();
  await knex("aircraft").insert([
    {
      tail_number: "PK-MGI",
      model: "Boeing 737",
      Economy_seats: 50,
      Business_seats: 50,
      Platinum_seats: 26,
    },
    {
      tail_number: "PK-MGZ",
      model: "Boeing 737",
      Economy_seats: 50,
      Business_seats: 50,
      Platinum_seats: 26,
    },
    {
      tail_number: "PK-YGH",
      model: "Boeing 737",
      Economy_seats: 50,
      Business_seats: 50,
      Platinum_seats: 26,
    },
    {
      tail_number: "PK-YGV",
      model: "Boeing 757",
      Economy_seats: 70,
      Business_seats: 60,
      Platinum_seats: 32,
    },
    {
      tail_number: "PK-YGW",
      model: "Boeing 757",
      Economy_seats: 70,
      Business_seats: 60,
      Platinum_seats: 32,
    },
    {
      tail_number: "PK-LBW",
      model: "Boeing 757",
      Economy_seats: 70,
      Business_seats: 60,
      Platinum_seats: 32,
    },
    {
      tail_number: "PK-LBZ",
      model: "Boeing 757",
      Economy_seats: 70,
      Business_seats: 60,
      Platinum_seats: 32,
    },
    {
      tail_number: "PK-LUV",
      model: "Airbus A380",
      Economy_seats: 200,
      Business_seats: 200,
      Platinum_seats: 125,
    },
  ]);
};
