const { wieldSlots } = require('../constants');

const guard = () => ({
  name: 'Guard',
  race: 'Human',
  LVL: 10,
  HEA: 15,
  ACC: 10,
  STR: 15,
  WIS: 1,
  DEX: 1,
  INT: 1,
  DEF: 10,
  SPD: 5,
  chance: 70,
  gear: {
    [wieldSlots.RIGHTHAND]: { name: 'ironShortSword' },
    [wieldSlots.LEFTHAND]: { name: 'ironShield' },
  },
  drops: [
    { name: 'coin', amount: 10, chance: 20 },
    { name: 'coin', amount: 20, chance: 20 },
    { name: 'coin', amount: 30, chance: 15 },
    { name: 'coin', amount: 45, chance: 15 },
    { name: 'coin', amount: 50, chance: 10 },
    { name: 'ironShortSword', amount: 1, chance: 10 },
    { name: 'steelDagger', amount: 1, chance: 1 },
    { name: 'steelShortSword', amount: 1, chance: 1 },
    { name: 'ironShield', amount: 1, chance: 1 },
  ],
  experience: 25,
});

const dwarvenTrader = () => ({
  name: 'Dwarven trader',
  race: 'Dwarf',
  LVL: 8,
  HEA: 25,
  ACC: 20,
  STR: 20,
  WIS: 1,
  DEX: 1,
  INT: 1,
  DEF: 1,
  SPD: 1,
  chance: 15,
  gear: {
    [wieldSlots.RIGHTHAND]: { name: 'ironMace' },
    [wieldSlots.CAPE]: { name: 'traderCape' },
  },
  drops: [
    { name: 'coin', amount: 100, chance: 20 },
    { name: 'coin', amount: 200, chance: 20 },
    { name: 'coin', amount: 300, chance: 15 },
    { name: 'coin', amount: 400, chance: 15 },
    { name: 'coin', amount: 5000, chance: 1 },
    { name: 'ironMace', amount: 1, chance: 10 },
  ],
  experience: 250,
});

const slaveTrader = () => ({
  name: 'Slave Trader',
  race: 'Human',
  LVL: 25,
  HEA: 15,
  ACC: 15,
  STR: 8,
  WIS: 15,
  DEX: 1,
  INT: 15,
  DEF: 5,
  SPD: 15,
  chance: 1,
  gear: {
    [wieldSlots.RIGHTHAND]: { name: 'wand' },
  },
  drops: [
    { name: 'coin', amount: 100, chance: 20 },
    { name: 'coin', amount: 200, chance: 20 },
    { name: 'coin', amount: 300, chance: 15 },
    { name: 'coin', amount: 400, chance: 15 },
    { name: 'coin', amount: 5000, chance: 1 },
  ],
  experience: 650,
});

module.exports = {
  guard,
  dwarvenTrader,
  slaveTrader,
};
