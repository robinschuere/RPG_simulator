const csv = require('csvtojson');
const path = require('path');
const { isLoaded: itemsLoaded, getItem } = require('../items');
const { isLoaded: monstersLoaded, getMonster } = require('../monsters');
const staller = require('../helpers/staller');
const { slots } = require('../constants');

const csvFilePath = path.join(
  __dirname,
  '../../gameData/locationsAndMonsters.csv',
);

const csvFileLocationPath = path.join(
  __dirname,
  '../../gameData/locations.csv',
);

let locations = [];
let locationsAndMonsters = [];

const getLocation = (id) => {
  return locations.find((s) => s.id === id);
};
const getLocationMonsters = (locationId) => {
  return locationsAndMonsters.filter((s) => s.location.id === locationId);
};

const loadLocations = () =>
  csv({
    delimiter: ';',
  })
    .fromFile(csvFileLocationPath)
    .then((csvObject) => {
      locations = csvObject;
    });

const loadLocationMonsters = () =>
  csv({
    delimiter: ';',
    colParser: {
      location: (item) => getLocation(item),
      monster: (item) => getMonster(item),
      gear: (item) => {
        const gearSlots = item.split(',');
        return gearSlots.map((slot) => {
          const [WIELDSLOT, itemId] = slot.split('|');
          return { [slots[WIELDSLOT]]: itemId };
        });
      },
      drops: (item) => {
        const dropItems = item.split(',');
        return dropItems.map((drop) => {
          const [itemId, amount, chance] = drop.split('|');
          return { itemId, amount, chance };
        });
      },
      chance: 'number',
    },
  })
    .fromFile(csvFilePath)
    .then((csvObject) => {
      locationsAndMonsters = csvObject;
    });

const getAll = () => locationsAndMonsters;
const getLocations = () => locations;

module.exports = {
  getLocationMonsters,
  getLocation,
  getAll,
  getLocations,
  loadLocations,
  loadLocationMonsters,
};
