const { itemTypes, wieldSlots } = require('../constants');

const amuletOfDamnation = () => ({
  name: `Amulet of Damnation`,
  description:
    'An unnatural black light seems to eminate from the heart of the crystal. It gives me the creeps.',
  wieldSlot: [wieldSlots.NECK],
  stackable: false,
  type: [
    itemTypes.arcane,
    itemTypes.arcaneDefensive,
    itemTypes.physical,
    itemTypes.physicalDefensive,
  ],
  bonus: 10,
  worth: 1000000,
  ACC: -10,
  HEA: -50,
  STR: 50,
  DEX: -25,
  DEF: -25,
  INT: -10,
  WIS: -10,
  SPD: 50,
});

module.exports = amuletOfDamnation;
