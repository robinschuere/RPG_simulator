const { itemTypes, slots } = require('../constants');

const goblinShield = () => ({
  name: `Goblin Shield`,
  description: 'A goblin shield made out of wood and nails',
  wieldSlot: [slots.LEFTHAND],
  stackable: false,
  type: itemTypes.physicalDefensive,
  bonus: 10,
  worth: 5,
  ACC: 0,
  HEA: 2,
  STR: 3,
  DEX: -3,
  DEF: 5,
  INT: 0,
  WIS: 0,
  SPD: 0,
});

module.exports = goblinShield;
