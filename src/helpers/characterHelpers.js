const { v4: uuid } = require('uuid');
const { systemMessage } = require('./messages');
const {
  options: { statistics, race, gender },
  characterStatistics,
  characterDefaults,
  raiseValue,
} = require('../constants');
const { optionAction, confirmAction, multiAction } = require('./promptActions');

const getGenderLabel = (character) => {
  const value = gender.find((f) => f.key === character.gender);
  return value ? value.value : 'UNKNOWN';
};

const getRaceLabel = (character) => {
  const value = race.find((f) => f.key === character.race);
  return value ? value.value : 'UNKNOWN';
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

const raiseLevel = async (character, options) => {
  const nextLvlExp = defineNextLevel(character);
  if (character.EXP >= nextLvlExp) {
    character.EXP -= nextLvlExp;
    character.LVL += 1;
    let isRaising = true;
    while (isRaising) {
      console.log();
      systemMessage(
        `Congratulations. You have gained a level. You can now update ${
          options.raiseStatistics || raiseValue
        } of your character characteristics.`,
      );
      console.log();
      const raisers = [];
      const values = await multiAction(
        `Select a statistic upgrade.`,
        statistics,
        options.raiseStatistics || raiseValue,
      );
      for (
        let index = 0;
        index < (options.raiseStatistics || raiseValue);
        index++
      ) {
        const raise = values[index];
        if (raisers.find((f) => f.key === raise.value)) {
          raisers.find((f) => f.key === raise.value).amount += 1;
        } else {
          raisers.push({ key: raise.value, amount: 1 });
        }
      }
      console.clear();
      const confirm = await confirmAction(
        `Are you sure? You will be elevating\n\n${raisers
          .map((f) => `${f.key}: +${f.amount}`)
          .join('\n')}\n`,
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

const elevateCharacter = async (character, stat, value, options) => {
  raiseStatistic(character, stat, value);
  if (stat === characterStatistics.HEA) {
    character.MAXHP = getMaxHealth(character);
    character.HP = getMaxHealth(character);
  }
  if (stat === characterStatistics.INT) {
    character.MANA = getMaxMana(character);
    character.MAXMANA = getMaxMana(character);
  }
  if (stat === characterStatistics.WIS) {
    character.MAXHP = getMaxHealth(character);
  }
  if (stat === characterStatistics.DEF) {
    character.MAXHP = getMaxHealth(character);
  }
  if (stat === characterStatistics.EXP) {
    character.TOTALEXP += value;
    await raiseLevel(character, options);
  }
};

const elevateCharacterStatistics = async (character, values, options) => {
  const EXPStatistic = values.find(
    (s) => s.statName === characterStatistics.EXP,
  );
  const otherStatistics = values.filter(
    (s) => s.statName !== characterStatistics.EXP,
  );

  for (let index = 0; index < otherStatistics.length; index++) {
    await elevateCharacter(
      character,
      otherStatistics[index].statName,
      otherStatistics[index].value,
      options,
    );
  }
  await elevateCharacter(
    character,
    characterStatistics.EXP,
    EXPStatistic.value,
    options,
  );
  return character;
};

const getBeginner = () => {
  const character = { id: uuid(), ...characterDefaults };
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
