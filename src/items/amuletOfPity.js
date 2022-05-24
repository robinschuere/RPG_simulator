const { itemTypes, wieldSlots } = require('../constants');

const amuletOfPity = () => ({
  name: `Amulet of Pity`,
  description:
    'An unnatural light seems to eminate from the heart of the crystal. It gives me hope.',
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
  ACC: 1,
  HEA: 1,
  STR: 1,
  DEX: 1,
  DEF: 1,
  INT: 1,
  WIS: 1,
  SPD: 1,
});

module.exports = amuletOfPity;
