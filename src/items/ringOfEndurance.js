const { itemTypes, wieldSlots } = require('../constants');

const ringOfEndurance = () => ({
  name: `Ring of Endurance`,
  description: 'A rare ring made by the most brilliant of Dwarfs.',
  wieldSlot: [wieldSlots.RIGHTRING, wieldSlots.LEFTRING],
  stackable: false,
  type: itemTypes.physicalDefensive,
  bonus: 25,
  worth: 1000000,
  ACC: 0,
  HEA: 0,
  STR: 0,
  DEX: 5,
  DEF: 25,
  INT: 0,
  WIS: 5,
  SPD: 0,
});

module.exports = ringOfEndurance;
