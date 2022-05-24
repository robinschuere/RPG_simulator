const { itemTypes, slots } = require('../constants');

const ironShortSword = () => ({
  name: `Iron short sword`,
  description: 'A sword made from iron',
  wieldSlot: [slots.RIGHTHAND],
  stackable: false,
  type: itemTypes.physical,
  bonus: 3,
  worth: 1,
  ACC: 2,
  HEA: 0,
  STR: 3,
  DEX: 0,
  DEF: 1,
  INT: 0,
  WIS: 0,
  SPD: 0,
});

module.exports = ironShortSword;
