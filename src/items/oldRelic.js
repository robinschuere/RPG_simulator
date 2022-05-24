const { itemTypes, wieldSlots } = require('../constants');

const oldRelic = () => ({
  name: `Old Relic`,
  description: 'A unique ring made from an unknown substance.',
  wieldSlot: [wieldSlots.RIGHTRING, wieldSlots.LEFTRING],
  stackable: false,
  type: [itemTypes.arcaneDefensive, itemTypes.physicalDefensive],
  bonus: 15,
  worth: 1000000,
  ACC: 25,
  HEA: 15,
  STR: 15,
  DEX: 15,
  DEF: 15,
  INT: 15,
  WIS: 15,
  SPD,
});

module.exports = oldRelic;
