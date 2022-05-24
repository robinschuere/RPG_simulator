const { v4: uuid } = require('uuid');
const { systemMessage } = require('./messages');
const { options, statistics, defaultValues } = require('../constants');
const { optionAction, confirmAction } = require('./promptActions');

const getGenderLabel = (character) => {
  const gender = options.gender.find((f) => f.key === character.gender);
  return gender ? gender.value : 'UNKNOWN';
};

const getRaceLabel = (character) => {
  const race = options.race.find((f) => f.key === character.race);
  return race ? race.value : 'UNKNOWN';
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

const raiseStatistic = (character, stat, value) => {
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
      console.log();
      systemMessage(
        'Congratulations. You have gained a level. You can now update 5 of your character characteristics.',
      );
      console.log();
      const raisers = [];
      for (let index = 0; index < 5; index++) {
        const raise = await optionAction(
          `Select a statistic upgrade.`,
          options.statistics,
        );
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
        raisers.forEach((f) => raiseStatistic(character, f.key, f.amount));
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
  raiseStatistic(character, stat, value);
  if (stat === statistics.HEA) {
    character.MAXHP = getMaxHealth(character);
    character.HP = getMaxHealth(character);
  }
  if (stat === statistics.INT) {
    character.MANA = getMaxMana(character);
    character.MAXMANA = getMaxMana(character);
  }
  if (stat === statistics.WIS) {
    character.MAXHP = getMaxHealth(character);
  }
  if (stat === statistics.DEF) {
    character.MAXHP = getMaxHealth(character);
  }
  if (stat === statistics.EXP) {
    character.TOTALEXP += value;
    await raiseLevel(character);
  }
};

const elevateCharacterStatistics = async (character, values) => {
  const EXPStatistic = values.find((s) => s.statName === statistics.EXP);
  const otherStatistics = values.filter((s) => s.statName !== statistics.EXP);

  for (let index = 0; index < otherStatistics.length; index++) {
    await elevateCharacter(
      character,
      otherStatistics[index].statName,
      otherStatistics[index].value,
    );
  }
  await elevateCharacter(character, statistics.EXP, EXPStatistic.value);
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
  elevateCharacterStatistics,
  addDefeatedRace,
  getBeginner,
  raiseStatistic,
  getMaxMana,
  getMaxHealth,
  getRaceLabel,
};
