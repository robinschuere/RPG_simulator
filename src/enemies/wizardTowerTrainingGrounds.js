const { wieldSlots } = require('../constants');

const goblin = () => ({
  name: 'Goblin',
  race: 'Goblin',
  LVL: 1,
  HEA: 5,
  ACC: 2,
  STR: 2,
  WIS: 1,
  DEX: 1,
  INT: 1,
  DEF: 1,
  SPD: 1,
  chance: 74,
  gear: {
    [wieldSlots.RIGHTHAND]: { name: 'woodenClub' },
  },
  drops: [
    { name: 'coin', amount: 1, chance: 20 },
    { name: 'coin', amount: 2, chance: 20 },
    { name: 'coin', amount: 3, chance: 15 },
    { name: 'coin', amount: 4, chance: 15 },
    { name: 'coin', amount: 5, chance: 10 },
    { name: 'goblinWarspear', amount: 1, chance: 10 },
    { name: 'goblinShield', amount: 1, chance: 10 },
  ],
  experience: 25,
});

const imp = () => ({
  name: 'Imp',
  race: 'Demon',
  LVL: 1,
  HEA: 5,
  ACC: 2,
  STR: 2,
  WIS: 1,
  DEX: 1,
  INT: 1,
  DEF: 1,
  SPD: 1,
  chance: 25,
  gear: {
    [wieldSlots.RIGHTHAND]: { name: 'ironDagger' },
  },
  drops: [
    { name: 'coin', amount: 1, chance: 20 },
    { name: 'coin', amount: 2, chance: 20 },
    { name: 'coin', amount: 3, chance: 15 },
    { name: 'coin', amount: 4, chance: 15 },
    { name: 'coin', amount: 5, chance: 10 },
    { name: 'goblinWarspear', amount: 1, chance: 10 },
    { name: 'goblinShield', amount: 1, chance: 10 },
  ],
  experience: 25,
});

const hobgoblin = () => ({
  name: 'Hobgoblin',
  race: 'Goblin',
  LVL: 5,
  HEA: 15,
  ACC: 15,
  STR: 8,
  WIS: 1,
  DEX: 1,
  INT: 1,
  DEF: 5,
  SPD: 1,
  chance: 1,
  gear: {
    [wieldSlots.RIGHTHAND]: { name: 'goblinSpear' },
    [wieldSlots.LEFTHAND]: { name: 'goblinShield' },
  },
  defeatedRaces: [
    { name: 'Human', amount: 50 },
  ],
  drops: [
    { name: 'coin', amount: 1, chance: 20 },
    { name: 'coin', amount: 2, chance: 20 },
    { name: 'coin', amount: 3, chance: 15 },
    { name: 'coin', amount: 4, chance: 15 },
    { name: 'coin', amount: 5, chance: 10 },
    { name: 'goblinWarspear', amount: 1, chance: 10 },
    { name: 'goblinShield', amount: 1, chance: 10 },
  ],
  experience: 245,
});

module.exports = {
  goblin,
  imp,
  hobgoblin,
};
