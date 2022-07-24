/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    {
      email: "test1_mod@gmail.com",
      password: "$2b$09$tkU0Te8xv98Ivor4Nxv7gOqoHc6GVCxn3gXz/iJKox8y.TjZRxBXy",
      first_name: "mod1",
      last_name: "mod1",
      role: "moderator",
      is_active: 1,
      dob: "1987-03-07",
    },
    {
      email: "test1_clr@gmail.com",
      password: "$2b$09$.nb0aGqTmcW6XoMH.u6JZeZ63GEJpvtaNx7XepSWqoMOwb2i1rrPe",
      first_name: "clr_1",
      last_name: "clr_1",
      role: "clerk",
      is_active: 1,
      dob: "1963-03-27",
    },
    {
      email: "test1_usr@gmail.com",
      password: "$2b$09$/G0kHfffgFWyjrgBu8keYuMS2KSAoMu62NxunfCCyfcJHlmrUq.pK",
      first_name: "usr_1",
      last_name: "usr_1",
      role: "user",
      discount_type: "gold",
      is_active: 1,
      dob: "2000-01-05",
    },
  ]);
};
