const { characterStages } = require('../constants');

const idle = {
  name: 'the training grounds of the wizard tower',
  options: [
    {
      key: 'A',
      value: 'Enter the Wizard tower',
      action: (character) => (character.location = 'wizardTower'),
    },
    {
      key: 'B',
      value: 'Train against lesser creatures',
      action: (character) => (character.stage = characterStages.training),
    },
  ],
};

module.exports = idle;
