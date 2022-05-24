const { slots, itemTypes } = require('../constants');
const { raiseStatistic, getMaxHealth, getMaxMana } = require('./characterHelpers');
const { getItem } = require('./itemHelpers');

const heal = (character, amount) => {
  const max = getMaxHealth(character);
  const maximumToHeal = max - character.HP;
  if (maximumToHeal > amount) {
    raiseStatistic(character, 'HP', amount);
  } else {
    raiseStatistic(character, 'HP', maximumToHeal);
  }
};

const fullHeal = (character) => {
  character.HP = getMaxHealth(character);
  character.MAXHP = getMaxHealth(character);
  character.MANA = getMaxMana(character);
  character.MAXMANA = getMaxMana(character);
  return character;
};

const addGearStatistics = (character, values, name) => {
  const item = getItem(character, name);

  values.HEA += item.HEA;
  values.STR += item.STR;
  values.DEF += item.DEF;
  values.WIS += item.WIS;
  values.INT += item.INT;
  values.DEX += item.DEX;
  values.ACC += item.ACC;
  values.SPD += item.SPD;

  const types = Array.isArray(item.type) ? item.type : [item.type];
  types.forEach((type) => {
    switch (type) {
      case itemTypes.physical:
        values.STR += item.bonus;
        break;
      case itemTypes.physicalDefensive:
        values.DEF += item.bonus;
        break;
      case itemTypes.arcane:
        values.INT += item.bonus;
        break;
      case itemTypes.arcaneDefensive:
        values.WIS += item.bonus;
        break;
    }
  });
};

const getCharacterStatistics = (character, enemy) => {
  const values = {
    HEA: character.HEA,
    STR: character.STR,
    DEF: character.DEF,
    WIS: character.WIS,
    DEX: character.DEX,
    INT: character.INT,
    ACC: character.ACC,
    SPD: character.SPD,
  };

  character.defeatedRaces ||
    []
      .filter((f) => f.name === enemy.race)
      .forEach(({ amount }) => {
        [10, 50, 100, 500, 1000, 10000, 100000].forEach((step) => {
          if (amount > step) {
            values.STR += defeatedRaceThresholds[step].STR || 0;
            values.DEF += defeatedRaceThresholds[step].DEF || 0;
            values.WIS += defeatedRaceThresholds[step].WIS || 0;
            values.DEX += defeatedRaceThresholds[step].DEX || 0;
            values.INT += defeatedRaceThresholds[step].INT || 0;
            values.ACC += defeatedRaceThresholds[step].ACC || 0;
            values.SPD += defeatedRaceThresholds[step].SPD || 0;
          }
        });
      });

  Object.keys(slots).forEach((key) => {
    if (character.gear[key]) {
      addGearStatistics(character, values, character.gear[key].name);
    }
  });

  const rightHandItem = character.gear[slots.RIGHTHAND]
    ? getItem(character, character.gear[slots.RIGHTHAND].name)
    : undefined;

  return {
    name: character.name,
    race: character.race,
    HP: character.HP !== undefined ? character.HP : getMaxHealth(character),
    MAXHP:
      character.MAXHP !== undefined ? character.MAXHP : getMaxHealth(character),
    MANA: character.MANA !== undefined ? character.MANA : getMaxMana(character),
    MAXMANA:
      character.MAXMANA !== undefined
        ? character.MAXMANA
        : getMaxMana(character),
    offenceType: rightHandItem ? rightHandItem.type : itemTypes.physical,
    arcaneOffence: values.INT,
    arcaneDefence: values.WIS,
    physicalOffence: values.STR,
    physicalDefence: values.DEF,
    dodge: values.DEX,
    block: values.DEF,
    accuracy: values.ACC,
    speed: values.SPD,
  };
};

const defineEnemy = (enemies) => {
  const chanceCounter = {};
  Object.keys(enemies).map((k) => {
    const firstKey = Object.keys(chanceCounter).length;
    for (let i = 0; i < enemies[k]().chance; i++) {
      const key = firstKey + i;
      chanceCounter[key] = k;
    }
  });
  const randomizer = Math.floor(
    Math.random() * Object.keys(chanceCounter).length,
  );
  return enemies[chanceCounter[randomizer]]();
};

module.exports = {
  getCharacterStatistics,
  heal,
  fullHeal,
  defineEnemy,
};
