/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('flight').del()
  await knex('flight').insert([
    {aircraft_id: 1, route_id: 2, takeoff_time:'2022-04-24 10:25:00', departure_time: '2022-04-24 13:35:00'},
    {aircraft_id: 8, route_id: 1, takeoff_time:'2022-04-24 08:00:00', departure_time: '2022-04-24 11:00:00'},
    {aircraft_id: 2, route_id: 3, takeoff_time:'2022-04-25 13:27:07', departure_time: '2022-04-25 16:27:07'},
    {aircraft_id: 4, route_id: 4, takeoff_time:'2022-04-25 13:35:00', departure_time: '2022-04-25 16:31:14'},
    {aircraft_id: 5, route_id: 6, takeoff_time:'2022-04-26 07:35:00', departure_time: '2022-04-26 09:30:00'},
    {aircraft_id: 6, route_id: 14,takeoff_time: '2022-04-26 20:00:00',departure_time:  '2022-04-26 22:00:00'},
    {aircraft_id: 1, route_id: 16,takeoff_time: '2022-04-27 06:30:00',departure_time:  '2022-04-27 09:30:00'},
    {aircraft_id: 2, route_id: 20,takeoff_time: '2022-04-27 15:00:00',departure_time:  '2022-04-27 16:30:00'},
    {aircraft_id: 8, route_id: 23,takeoff_time: '2022-04-28 02:30:00',departure_time:  '2022-04-28 04:00:00'},
    {aircraft_id: 3, route_id: 30,takeoff_time: '2022-04-28 22:00:00',departure_time:  '2022-04-28 23:40:00'},
    {aircraft_id: 4, route_id: 40,takeoff_time: '2022-04-29 10:40:00',departure_time:  '2022-04-29 12:40:00'},
    {aircraft_id: 5, route_id: 45,takeoff_time: '2022-04-29 01:00:00',departure_time:  '2022-04-29 02:30:00'},
    {aircraft_id: 7, route_id: 76,takeoff_time: '2022-04-30 18:00:00',departure_time:  '2022-04-30 20:00:00'},
    {aircraft_id: 8, route_id: 86,takeoff_time: '2022-04-30 22:44:00',departure_time:  '2022-04-30 23:44:00'}
  ]);
};
