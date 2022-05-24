const { itemTypes, wieldSlots } = require('../constants');

const helmetOfRokusho = () => ({
  name: `Rokusho's helmet`,
  description: 'An ornate helmet engraved with the Sigil of house Ezom',
  wieldSlot: [wieldSlots.HEAD],
  stackable: false,
  type: itemTypes.arcaneDefensive,
  bonus: 50,
  worth: 1000000,
  ACC: -5,
  HEA: 20,
  STR: 5,
  DEX: 5,
  DEF: 25,
  INT: 0,
  WIS: 0,
  SPD: 0,
});

module.exports = helmetOfRokusho;
