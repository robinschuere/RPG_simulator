const {
  slots,
  characterStatistics,
  cardWidth,
  masteryThresholds,
} = require('../constants');
const { getItem } = require('../items');
const { getGenderLabel, getRaceLabel } = require('./characterHelpers');

const getCharacterStat = (character) => (statistic) => {
  return `${character[statistic]}`.padStart(3, '0');
};

const getCharacterCard = (character, withLevels, withGear, withItems) => {
  const short = getCharacterStat(character);
  const levels = withLevels
    ? [
        { text: ``, endDelimiter: '=' },
        { text: `LEVELS` },
        { text: `----------` },
        {
          text: `HEA: [${short(characterStatistics.HEA)}]   STR: [${short(
            characterStatistics.STR,
          )}]   WIS: [${short(characterStatistics.WIS)}]`,
        },
        {
          text: `DEX: [${short(characterStatistics.DEX)}]   INT: [${short(
            characterStatistics.INT,
          )}]   DEF: [${short(characterStatistics.DEF)}]`,
        },
        {
          text: `ACC: [${short(characterStatistics.ACC)}]   SPD: [${short(
            characterStatistics.SPD,
          )}]`,
        },
      ]
    : [];

  const gear = withGear
    ? [
        { text: ``, endDelimiter: '=' },
        { text: `GEAR` },
        { text: `----------` },
        ...Object.keys(slots).map((key) => {
          if (character.gear[key]) {
            const item = getItem(character.gear[key]);
            return { text: `${key.padEnd(10, ' ')}: ${item.name}` };
          } else {
            return { text: `${key.padEnd(10, ' ')}: -----` };
          }
        }),
      ]
    : [];

  const items = withItems
    ? [
        { text: ``, endDelimiter: '=' },
        { text: `ITEMS` },
        { text: `----------` },
        ...character.inventory.map((f) => {
          const item = getItem(f.itemId);
          return { text: `${item.name} x${f.amount}` };
        }),
      ]
    : [];

  const titles = (character.defeatedRaces || []).find(
    ({ amount }) => amount >= 10,
  )
    ? [
        { text: ``, endDelimiter: '=' },
        { text: `TITLES` },
        { text: `----------` },
        ...character.defeatedRaces
          .filter(({ amount }) => amount >= 10)
          .map(({ name, amount }) => {
            const thresshold = [100000, 10000, 1000, 500, 100, 50, 10].find(
              (s) => amount >= s,
            );
            const mastery = masteryThresholds[thresshold];
            if (mastery) {
              return { text: mastery.name(name) };
            }
          }),
      ]
    : [];

  const values = [
    { text: 'INFOCARD', endDelimiter: '~' },
    { text: `NAME: ${character.name}` },
    { text: `RACE: ${getRaceLabel(character)}` },
    { text: `A ${getGenderLabel(character)} from ${character.world}` },
    { text: ``, endDelimiter: '=' },
    {
      text: `LVL: [${character.LVL}]  EXP: [${character.EXP}]/[${character.NEXTEXP}]([${character.TOTALEXP}])`,
    },
    { text: `HP: [${character.HP}]/[${character.MAXHP}]` },
    { text: `mana: [${character.MANA}]/[${character.MAXMANA}]` },
    ...levels,
    ...gear,
    ...items,
    ...titles,
    { text: ``, endDelimiter: '~' },
  ];
  console.log();
  values.forEach(({ text, endDelimiter = ' ' }) => {
    console.log(`     ${text}`.padEnd(cardWidth, endDelimiter).black.bgGreen);
  });
  console.log();
};

module.exports = {
  getCharacterCard,
};
