const { itemTypes, wieldSlots } = require('../constants');

const woodenClub = () => ({
  name: `Wooden club`,
  description: 'It seems like a small tree',
  wieldSlot: [wieldSlots.RIGHTHAND],
  stackable: false,
  type: itemTypes.physical,
  bonus: 1,
  worth: 1,
  ACC: 3,
  HEA: 0,
  STR: 3,
  DEX: 0,
  DEF: 0,
  INT: 0,
  WIS: 0,
  SPD: 0,
});

module.exports = woodenClub;
