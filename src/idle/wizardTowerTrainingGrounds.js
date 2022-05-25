const { characterStages } = require('../constants');
const { getLocation } = require('../locations');

const idle = () => ({
  ...getLocation('000002'),
  options: [
    {
      key: 'A',
      value: 'Enter the Wizard tower',
      action: (character) => (character.location = '000001'),
    },
    {
      key: 'B',
      value: 'Train against lesser creatures',
      action: (character) => (character.stage = characterStages.training),
    },
  ],
});

module.exports = idle;
