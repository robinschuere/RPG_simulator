require('colors');
const { runStory } = require('./stories');
const { runIdle, loadIdleLocations } = require('./idle');
const { runTraining } = require('./training');
const {
  characterStages,
  pages: { help: helpPage },
  characterDefaults,
} = require('./constants');
const { getBeginner } = require('./helpers/characterHelpers');
const { argumentTranslator } = require('./helpers/argumentHelper');
const {
  getSaveSlots,
  showCharacterSelector,
} = require('./helpers/fileHelpers');
const {
  isLoaded,
  loadLocations,
  loadLocationMonsters,
  getLocations,
  getAll,
} = require('./locations');
const staller = require('./helpers/staller');
const { loadItems, getItems } = require('./items');
const { loadMonsters, getMonsters } = require('./monsters');

const openOrCreateCharacter = async () => {
  const saveSlots = await getSaveSlots();
  if (saveSlots.length > 0) {
    const character = await showCharacterSelector();
    return character || getBeginner();
  }
  return getBeginner();
};

const load = async (options) => {
  const showPercentage = (percentage) => () => {
    console.clear();
    console.log(
      `Loading ........... ${percentage.toString().padStart(3, ' ')}/100 Loaded`
        .black.bgRed,
    );
    console.log('->> items loaded: ', getItems().length);
    console.log('->> monsters loaded: ', getMonsters().length);
    console.log('->> locations loaded: ', getLocations().length);
    console.log('->> monsters now inhabiting locations: ', getAll().length);
  };
  await Promise.resolve()
    .then(loadLocations)
    .then(showPercentage(20))
    .then(loadItems)
    .then(showPercentage(40))
    .then(loadMonsters)
    .then(showPercentage(60))
    .then(loadLocationMonsters)
    .then(showPercentage(80))
    .then(loadIdleLocations)
    .then(showPercentage(100));
  await staller(options.stall || 1);
  console.log('Spinning up Kuramzo');
  await staller(options.stall || 1);
};

const runner = async (args) => {
  let running = true;
  const options = argumentTranslator(args);
  if (options.help) {
    console.log(helpPage.blue);
    return;
  }
  await load(options);
  console.clear();

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
