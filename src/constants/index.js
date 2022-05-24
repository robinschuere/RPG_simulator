const { characterDefaults } = require('./defaults');
const options = require('./options');
const slots = require('./slots');
const { characterStages } = require('./stages');
const statistics = require('./statistics');
const { masteryThresholds } = require('./thresholds');
const { itemTypes, spellTypes, attackTypes } = require('./types');
const types = require('./types');
const pages = require('./pages');

module.exports = {
  slots,
  statistics,
  spellTypes,
  characterStages,
  itemTypes,
  masteryThresholds,
  attackTypes,
  options,
  characterDefaults,
  storyStallTime: 3,
  fightStallTime: 1.5,
  cardWidth: 75,
  narrators: {
    SYSTEM: 'SYSTEM',
    YOU: 'YOU',
  },
  pages,
};
