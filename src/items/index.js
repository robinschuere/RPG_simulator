const csv = require('csvtojson');
const path = require('path');
const csvFilePath = path.join(__dirname, '../../gameData/items.csv');

let items = [];

const loadItems = () =>
  csv({
    delimiter: ';',
    colParser: {
      slot: (item) => item.split(','),
      tier: 'number',
      stackable: (item) => !!item,
      worth: 'number',
      ACC: 'number',
      HEA: 'number',
      STR: 'number',
      DEX: 'number',
      DEF: 'number',
      INT: 'number',
      WIS: 'number',
      SPD: 'number',
    },
  })
    .fromFile(csvFilePath)
    .then((csvObject) => {
      items = csvObject;
    });

const getItem = (id) => {
  return items.find((s) => s.id === id);
};

const getItems = () => items;

module.exports = {
  getItem,
  loadItems,
  getItems,
};
