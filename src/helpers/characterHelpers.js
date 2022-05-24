const { v4: uuid } = require('uuid');
const { systemMessage } = require('./messages');
const { lists, stats, defaultValues } = require('../constants');
const { optionAction, confirmAction } = require('./promptActions');

const getGenderLabel = (character) => {
  const gender = lists.gender.find((f) => f.key === character.gender);
  return gender ? gender.value : 'UNKNOWN';
};

const getMaxHealth = (character) => {
  return character.HEA * 5 + character.WIS * 2 + character.DEF * 2;
};

const getMaxMana = (character) => {
  return character.INT * 8;
};

const defineNextLevel = (character) => {
  return parseInt(character.LVL + 300 * (character.LVL / 9), 10);
};

const raiseStat = (character, stat, value) => {
  character[stat] += value;
  return character;
};

const raiseLevel = async (character) => {
  const nextLvlExp = defineNextLevel(character);
  if (character.EXP >= nextLvlExp) {
    character.EXP -= nextLvlExp;
    character.LVL += 1;
    let isRaising = true;
    while (isRaising) {
      systemMessage(
        'Congratulations. You have gained a lvl. You can now update 5 stats.',
      );
      const raisers = [];
      for (let index = 0; index < 5; index++) {
        const raise = await optionAction('Select a stat.', lists.stat);
        if (raisers.find((f) => f.key === raise.value)) {
          raisers.find((f) => f.key === raise.value).amount += 1;
        } else {
          raisers.push({ key: raise.value, amount: 1 });
        }
      }
      const confirm = await confirmAction(
        `Are you sure? You will be elevating\n${raisers
          .map((f) => `${f.key}: +${f.amount}`)
          .join('\n')}`,
      );
      if (confirm) {
        raisers.forEach((f) => raiseStat(character, f.key, f.amount));
        isRaising = false;
      }
    }
    character.HP = getMaxHealth(character);
    character.MAXHP = getMaxHealth(character);
    character.NEXTEXP = defineNextLevel(character);
    await raiseLevel(character);
  }
};

const elevateCharacter = async (character, stat, value) => {
  raiseStat(character, stat, value);
  if (stat === stats.HEA) {
    character.MAXHP = getMaxHealth(character);
    character.HP = getMaxHealth(character);
  }
  if (stat === stats.INT) {
    character.MANA = getMaxMana(character);
    character.MAXMANA = getMaxMana(character);
  }
  if (stat === stats.WIS) {
    character.MAXHP = getMaxHealth(character);
  }
  if (stat === stats.DEF) {
    character.MAXHP = getMaxHealth(character);
  }
  if (stat === stats.EXP) {
    character.TOTALEXP += value;
    await raiseLevel(character);
  }
};

const elevateCharacterValues = async (character, values) => {
  const EXPStat = values.find((s) => s.statName === stats.EXP);
  const otherStats = values.filter((s) => s.statName !== stats.EXP);

  for (let index = 0; index < otherStats.length; index++) {
    await elevateCharacter(
      character,
      otherStats[index].statName,
      otherStats[index].value,
    );
  }
  await elevateCharacter(character, stats.EXP, EXPStat.value);
  return character;
};

const getBeginner = () => {
  const character = { id: uuid(), ...defaultValues };
  character.MAXHP = getMaxHealth(character);
  character.HP = getMaxHealth(character);
  character.NEXTEXP = defineNextLevel(character);
  character.MANA = getMaxMana(character);
  character.MAXMANA = getMaxMana(character);
  return character;
};

const addDefeatedRace = (character, race) => {
  const defeatedRace = character.defeatedRaces.find((f) => f.name === race);
  if (defeatedRace) {
    defeatedRace.amount += 1;
  } else {
    character.defeatedRaces.push({ name: race, amount: 1 });
  }
};

module.exports = {
  getGenderLabel,
  elevateCharacterValues,
  addDefeatedRace,
  getBeginner,
  raiseStat,
  getMaxMana,
  getMaxHealth,
};
