const { characterStages } = require('../constants');
const { locationAndEnemies } = require('../enemies');
const { runFight } = require('../fight');
const { defineEnemy } = require('../helpers/combatHelpers');
const { confirmAction } = require('../helpers/promptActions');

const runTraining = async (character, options) => {
  const locationEnemies = locationAndEnemies[character.location];
  if (!locationEnemies) {
    throw new Error(
      `The location ${character.location} does not exist and has no enemies!`,
    );
  }
  const enemy = defineEnemy(locationEnemies);
  await runFight(character, enemy, options);
  const continueTraining = await confirmAction(
    'Do you want to venture deeper into the woods?',
  );
  if (!continueTraining) {
    character.stage = characterStages.idle;
  }
};

module.exports = {
  runTraining,
};
