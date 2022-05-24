const {
  infoCard: { general, levels, gear },
  wieldSlots,
} = require('../constants');
const { getGenderLabel } = require('./characterHelpers');
const { getItem } = require('./itemHelpers');

const getGear = (character) => {
  let gearMessage = gear;
  Object.keys(wieldSlots).forEach((key) => {
    if (character.gear[key]) {
      const item = getItem(character, character.gear[key].name);
      gearMessage = gearMessage.replace(`[${key}]`, item.name);
    } else {
      gearMessage = gearMessage.replace(`[${key}]`, ' -- ');
    }
  });
  return gearMessage;
};

const getItems = (character) => {
  return character.inventory
    .map((f) => {
      const item = getItem(character, f.name);
      return `${item.name} x${f.amount}`;
    })
    .join('\n');
};

const getLevels = (character) => {
  return levels
    .replace('[HEA]', `${character.HEA}`.padStart(3, ' '))
    .replace('[STR]', `${character.STR}`.padStart(3, ' '))
    .replace('[WIS]', `${character.WIS}`.padStart(3, ' '))
    .replace('[DEX]', `${character.DEX}`.padStart(3, ' '))
    .replace('[INT]', `${character.INT}`.padStart(3, ' '))
    .replace('[DEF]', `${character.DEF}`.padStart(3, ' '))
    .replace('[ACC]', `${character.ACC}`.padStart(3, ' '))
    .replace('[SPD]', `${character.SPD}`.padStart(3, ' '));
};

const getCharacterCard = (character, withLevels, withGear, withItems) => {
  const card = general
    .replace('[NAME]', character.name)
    .replace('[RACE]', character.race)
    .replace('[SEX]', getGenderLabel(character))
    .replace('[WORLD]', `${character.world}`)
    .replace('[LVL]', `${character.LVL}`)
    .replace('[EXP]', `${character.EXP}`)
    .replace('[NEXTEXP]', character.NEXTEXP)
    .replace('[HP]', character.HP)
    .replace('[MAXHP]', character.MAXHP)
    .replace('[MANA]', character.MANA)
    .replace('[MAXMANA]', character.MAXMANA)
    .replace('[TOTALEXP]', `${character.TOTALEXP}`)
    .replace('[INSERTLEVELSHERE]', withLevels ? getLevels(character) : '')
    .replace('[INSERTGEARHERE]', withGear ? getGear(character) : '')
    .replace('[INSERTITEMSHERE]', withItems ? getItems(character) : '');
  console.log(card.bgBlue);
};

module.exports = {
  getCharacterCard,
};
