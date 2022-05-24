require('colors');
const { runStory } = require('./stories');
const { runIdle } = require('./idle');
const { runTraining } = require('./training');
const { stages } = require('./constants');
const { getBeginner } = require('./helpers/characterHelpers');
const { argumentTranslator } = require('./helpers/argumentHelper');
const {
  getSaveSlots,
  showCharacterSelector,
} = require('./helpers/fileHelpers');

const openOrCreateCharacter = async () => {
  const saveSlots = await getSaveSlots();
  if (saveSlots.length > 0) {
    const character = await showCharacterSelector();
    return character || getBeginner();
  }
  return getBeginner();
};

const runner = async (args) => {
  let running = true;
  const givenArguments = argumentTranslator(args);

  const character = await openOrCreateCharacter();
  const stop = () => (running = false);
  while (running) {
    switch (character.stage) {
      case stages.introduction:
        await runStory(character, givenArguments);
        break;
      case stages.idle:
        await runIdle(character, stop, givenArguments);
        break;
      case stages.training:
        await runTraining(character, givenArguments);
        break;
      default:
        break;
    }
  }
};

module.exports = runner;
