/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("passenger").del();
  await knex("passenger").insert([
    {
      passenger_id: "A0000001",
      name: "Kabilan Mahathevan",
      dob: "1999-03-25",
      address: "No. 45/60, Thirunavatkulam, Vavuniya, Sri Lanka",
    },
    {
      passenger_id: "A0000002",
      name: "Jathavan Mahendrarajah",
      dob: "2000-01-05",
      address: "No. 36/1, 3rd lane, Pandarikulam, Vavuniya, Srilanka",
    },
    {
      passenger_id: "A0000003",
      name: "John Wick",
      dob: "1987-03-07",
      address: "112 Lower Horseshoe, Mill Neck, New York City, New York, USA.",
    },
    {
      passenger_id: "A0000004",
      name: "Leonardo DiCaprio",
      dob: "1974-11-11",
      address: "Suite 615, West Hollywood, CA 90069 USA",
    },
    {
      passenger_id: "A0000005",
      name: "Kate Winslet",
      dob: "1975-10-05",
      address:
        "Drury House, 34-43 Russell Street London, WC2B5HA, United Kingdom",
    },
    {
      passenger_id: "A0000006",
      name: "Quentin Tarantino",
      dob: "1963-03-27",
      address: "601 Wilshire Blvd. 3rd Floor Beverly Hills, CA 90210-5213. USA",
    },
    {
      passenger_id: "A0000007",
      name: "Mahinda Rajapaksa",
      dob: "1945-11-18",
      address: "No. 117, Wijerama Mawatha, Colombo 07, Sri Lanka",
    },
    {
      passenger_id: "A0000008",
      name: "Gotabaya Rajapaksa",
      dob: "1948-06-20",
      address: "No. 26/A, Pangiriwatta Mawatha, Mirihana, Nugegoda, Sri Lanka",
    },
    {
      passenger_id: "A0000009",
      name: "Basil Rajapaksa",
      dob: "1951-04-27",
      address: "No. 1316, Jayanthipura, Nelum Mawatha, Battaramulla, Sri Lanka",
    },
    {
      passenger_id: "A0000010",
      name: "Goran Peterson",
      dob: "2010-04-10",
      address: "No. 15, Lotus Avenue, Helineski, Finland",
    },
    {
      passenger_id: "A0000011",
      name: "Arifullah Khan",
      dob: "2015-04-10",
      address: "No. 1516, Havelok street, Stockholm, Sweden",
    },
  ]);
};
