const { itemTypes, wieldSlots } = require('../constants');

const leatherBoots = () => ({
  name: `Leather boots`,
  description: 'Boots made from leather',
  wieldSlot: [wieldSlots.FEET],
  stackable: false,
  type: itemTypes.physicalDefensive,
  bonus: 2,
  worth: 1,
  ACC: 0,
  HEA: 0,
  STR: 0,
  DEX: 1,
  DEF: 0,
  INT: 0,
  WIS: 0,
  SPD: 1,
});

module.exports = leatherBoots;
