const { itemTypes, slots } = require('../constants');

const tunic = () => ({
  name: `Tunic`,
  description: 'A tunic made from soft wool',
  wieldSlot: [slots.BODY],
  stackable: false,
  type: itemTypes.physicalDefensive,
  bonus: 2,
  worth: 1,
  ACC: 0,
  HEA: 0,
  STR: 0,
  DEX: 0,
  DEF: 2,
  INT: 0,
  WIS: 0,
  SPD: 0,
});

module.exports = tunic;
