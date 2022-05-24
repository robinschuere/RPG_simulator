const { itemTypes, slots } = require('../constants');

const bowOfDarkness = () => ({
  name: 'Bow of Darkness',
  description:
    'The souls that this bow has consumed are trying to break your will.',
  wieldSlot: [slots.RIGHTHAND],
  stackable: false,
  type: itemTypes.arcane,
  bonus: 95,
  worth: 1000000,
  ACC: 25,
  HEA: 25,
  STR: 50,
  DEX: 25,
  DEF: 0,
  INT: -25,
  WIS: -25,
  SPD: 15,
});

module.exports = bowOfDarkness;
