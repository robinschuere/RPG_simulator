const { saveCharacter } = require('../helpers/fileHelpers');
const { optionAction, quitAction } = require('../helpers/promptActions');
const { getCharacterCard } = require('../helpers/textHelpers');

const idleLocations = {
  wizardTower: require('./wizardTower'),
  wizardTowerGeneralStore: require('./wizardTowerGeneralStore'),
  wizardTowerTrainingGrounds: require('./wizardTowerTrainingGrounds'),
  mizgogOfficeDoor: require('./mizgogOfficeDoor'),
};

const runIdle = async (character, stop, { doNotCleanConsole = false }) => {
  const idle = idleLocations[character.location];
  if (!idle) {
    throw new Error(
      `This idle location ${character.location} is not written yet!`,
    );
  }
  const quit = async (character) => {
    const quited = await quitAction();
    if (quited) {
      await saveCharacter(character);
      stop();
    }
  };
  const idleOptions = [
    ...idle.options,
    {
      key: '1',
      value: 'Show character card',
      action: () => getCharacterCard(character, true),
    },
    {
      key: '2',
      value: 'check items',
      action: () => getCharacterCard(character, false, true, true),
    },
    { key: 'S', value: 'Save', action: () => saveCharacter(character) },
    { key: 'Q', value: 'Quit', action: () => quit(character) },
  ];
  const option = await optionAction(`You stand at ${idle.name}`, idleOptions);
  if (!doNotCleanConsole) {
    console.clear();
  }
  await option.action(character);
};

module.exports = {
  runIdle,
};
