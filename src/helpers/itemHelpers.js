const items = require('../items');

const getItem = (character, name) => {
  const item = items[name];
  if (!item) throw new Error(`Item ${name} was not defined yet!`);
  return item(character);
};

module.exports = {
  getItem,
};
