const { itemTypes, slots } = require('../constants');

const ironDagger = () => ({
  name: `Iron dagger`,
  description: 'A dagger made from iron',
  wieldSlot: [slots.RIGHTHAND],
  stackable: false,
  type: itemTypes.physical,
  bonus: 1,
  worth: 1,
  ACC: 4,
  HEA: 0,
  STR: 2,
  DEX: 0,
  DEF: 0,
  INT: 0,
  WIS: 0,
  SPD: 0,
});

module.exports = ironDagger;
