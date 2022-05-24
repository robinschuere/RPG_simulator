const { spellTypes } = require('../constants');

const firebolt = () => ({
  name: `Firebolt`,
  description: 'A low magical spell for burning enemies',
  spellType: spellTypes.offensive,
  bonus: 5,
});

module.exports = firebolt;
