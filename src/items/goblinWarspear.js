const { itemTypes, slots } = require('../constants');

const goblinWarspear = () => ({
  name: `Goblin Warspear`,
  description: 'A goblin spear soaked with blood.',
  wieldSlot: [slots.RIGHTHAND],
  stackable: false,
  type: itemTypes.physical,
  bonus: 10,
  worth: 1,
  ACC: 1,
  HEA: 0,
  STR: 8,
  DEX: 3,
  DEF: 1,
  INT: 0,
  WIS: 0,
  SPD: 0,
});

module.exports = goblinWarspear;
