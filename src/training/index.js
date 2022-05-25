const { characterStages, storyStallTime } = require('../constants');
const { getLocationMonsters, getLocation } = require('../locations');
const { runFight } = require('../fight');
const { defineEnemy } = require('../helpers/combatHelpers');
const { confirmAction } = require('../helpers/promptActions');
const { systemMessage } = require('../helpers/messages');
const staller = require('../helpers/staller');

const runTraining = async (character, options) => {
  const locationMonsters = getLocationMonsters(character.location);
  if (!locationMonsters || locationMonsters.length === 0) {
    const location = getLocation(character.location);
    throw new Error(
      `The location ${location ? location.name : 'UNKNOWN'} has no enemies!`,
    );
  }
  const enemy = defineEnemy(locationMonsters);
  await runFight(character, enemy, options);
  if (character.stage === characterStages.death) {
    console.log();
    systemMessage(
      `With a towering gleam, the ${enemy.name} swings at you. By some incredible form of luck, you see a way to escape your imminent death.`,
    );
    await staller(options.stall || storyStallTime);
    systemMessage(
      `You jump out of the goblins sight and with your last strength, you start running for dear life... You feel how you lose the magical essence that you earned untill now...`,
    );
    character.HP = 1;
    character.EXP = 0;
    character.stage = characterStages.idle;
    return;
  }
  const continueTraining = await confirmAction(
    'Do you want to venture deeper into the woods?',
  );
  console.clear();
  if (!continueTraining) {
    character.stage = characterStages.idle;
  }
};

module.exports = {
  runTraining,
};
