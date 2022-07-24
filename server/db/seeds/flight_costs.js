/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('flight_cost').del()
  await knex('flight_cost').insert([
    { flight_id: 1, class: 'Business',cost:  '800.00'},
{ flight_id: 1, class: 'Economy',cost:  '400.00'},
{ flight_id: 1, class: 'Platinum', cost: '1000.00'},
{ flight_id: 2, class: 'Business',cost:  '800.00'},
{ flight_id: 2, class: 'Economy',cost:  '400.00'},
{ flight_id: 2, class: 'Platinum', cost: '1000.00'},
{ flight_id: 3, class: 'Business',cost:  '800.00'},
{ flight_id: 3, class: 'Economy',cost:  '400.00'},
{ flight_id: 3, class: 'Platinum', cost: '1000.00'},
{ flight_id: 4, class: 'Business',cost:  '800.00'},
{ flight_id: 4, class: 'Economy',cost:  '400.00'},
{ flight_id: 4, class: 'Platinum', cost: '1000.00'},
{ flight_id: 5, class: 'Business',cost:  '800.00'},
{ flight_id: 5, class: 'Economy',cost:  '400.00'},
{ flight_id: 5, class: 'Platinum', cost: '1000.00'},
{ flight_id: 6, class: 'Business',cost:  '800.00'},
{ flight_id: 6, class: 'Economy',cost:  '400.00'},
{ flight_id: 6, class: 'Platinum', cost: '1000.00'},
{ flight_id: 7, class: 'Business',cost:  '800.00'},
{ flight_id: 7, class: 'Economy',cost:  '400.00'},
{ flight_id: 7, class: 'Platinum', cost: '1000.00'},
{ flight_id: 8, class: 'Business',cost:  '800.00'},
{ flight_id: 8, class: 'Economy',cost:  '400.00'},
{ flight_id: 8, class: 'Platinum', cost: '1000.00'},
{ flight_id: 9, class: 'Business',cost:  '800.00'},
{ flight_id: 9, class: 'Economy',cost:  '400.00'},
{ flight_id: 9, class: 'Platinum', cost: '1000.00'},
{ flight_id: 10,class:  'Business',cost:  '800.00'},
{ flight_id: 10,class:  'Economy',cost:  '400.00'},
{ flight_id: 10,class:  'Platinum', cost: '1000.00'},
{ flight_id: 11,class:  'Business',cost:  '800.00'},
{ flight_id: 11,class:  'Economy',cost:  '400.00'},
{ flight_id: 11,class:  'Platinum', cost: '1000.00'},
{ flight_id: 12,class:  'Business',cost:  '800.00'},
{ flight_id: 12,class:  'Economy',cost:  '400.00'},
{ flight_id: 12,class:  'Platinum', cost: '1000.00'},
{ flight_id: 13,class:  'Business',cost:  '800.00'},
{ flight_id: 13,class:  'Economy',cost:  '400.00'},
{ flight_id: 13,class:  'Platinum', cost: '1000.00'},
{ flight_id: 14,class:  'Business',cost:  '800.00'},
{ flight_id: 14,class:  'Economy',cost:  '400.00'},
{ flight_id: 14,class:  'Platinum', cost: '1000.00'}
  ]);
};
