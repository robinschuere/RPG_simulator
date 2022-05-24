require('colors');
const { runStory } = require('./stories');
const { runIdle } = require('./idle');
const { runTraining } = require('./training');
const { characterStages, helpPage, stallTime } = require('./constants');
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
  const options = argumentTranslator(args);
  if (options.help) {
    console.log(helpPage.blue);
    return;
  }

  const character = await openOrCreateCharacter();
  if (!options.doNotCleanConsole) {
    console.clear();
  }
  const stop = () => (running = false);
  while (running) {
    switch (character.stage) {
      case characterStages.introduction:
        await runStory(character, stop, options);
        break;
      case characterStages.idle:
        await runIdle(character, stop, options);
        break;
      case characterStages.training:
        await runTraining(character, options);
        break;
      default:
        break;
    }
  }
};

module.exports = runner;
