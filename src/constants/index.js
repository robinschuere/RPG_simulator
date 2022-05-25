const { characterDefaults } = require('./defaults');
const options = require('./options');
const slots = require('./slots');
const { characterStages } = require('./stages');
const characterStatistics = require('./characterStatistics');
const { masteryThresholds } = require('./thresholds');
const { itemTypes, spellTypes, attackTypes } = require('./types');
const pages = require('./pages');
const races = require('./races');

module.exports = {
  slots,
  characterStatistics,
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
  raiseValue: 5,
  narrators: {
    SYSTEM: 'SYSTEM',
    YOU: 'YOU',
  },
  pages,
  races,
};
