const { spellTypes } = require('../constants');

const checkMyStatzz = () => ({
  name: `Check my statzz`,
  description: 'A spell for reading ones own lvl',
  spellType: spellTypes.utility,
});

module.exports = checkMyStatzz;
