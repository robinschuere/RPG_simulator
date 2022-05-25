const csv = require('csvtojson');
const path = require('path');
const csvFilePath = path.join(__dirname, '../../gameData/monsters.csv');

let monsters = [];

const loadMonsters = () =>
  csv({
    delimiter: ';',
    colParser: {
      LVL: 'number',
      ACC: 'number',
      HEA: 'number',
      STR: 'number',
      DEX: 'number',
      DEF: 'number',
      INT: 'number',
      WIS: 'number',
      SPD: 'number',
      EXP: 'number',
    },
  })
    .fromFile(csvFilePath)
    .then((csvObject) => {
      monsters = csvObject;
    });

const getMonster = (id) => {
  const monster = monsters.find((s) => s.id === id);

  if (!monster) {
    console.log(monsters);
  }
  return monster;
};

const getMonsters = () => monsters;

module.exports = {
  getMonster,
  getMonsters,
  loadMonsters,
};
