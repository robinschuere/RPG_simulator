const { slots, statistics, cardWidth } = require('../constants');
const { getGenderLabel, getRaceLabel } = require('./characterHelpers');
const { getItem } = require('./itemHelpers');

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
          text: `HEA: [${short(statistics.HEA)}]   STR: [${short(
            statistics.STR,
          )}]   WIS: [${short(statistics.WIS)}]`,
        },
        {
          text: `DEX: [${short(statistics.DEX)}]   INT: [${short(
            statistics.INT,
          )}]   DEF: [${short(statistics.DEF)}]`,
        },
        {
          text: `ACC: [${short(statistics.ACC)}]   SPD: [${short(
            statistics.SPD,
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
            const item = getItem(character, character.gear[key].name);
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
          const item = getItem(character, f.name);
          return { text: `${item.name} x${f.amount}` };
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
