const { hasCompletedQuest } = require('../helpers/questHelpers');

const canEnter = (character) => {
  if (hasCompletedQuest(character, 'aFirstEncounter')) {
    console.log('After a soft knock, you enter the office');
    character.location = 'mizgogOffice';
  } else {
    console.log(
      'You knock on the door. No reply is given and the door remains shut.',
    );
  }
};

const idle = {
  name: `Mizgog's office`,
  options: [
    {
      key: 'A',
      value: 'Knock on the door',
      action: canEnter,
    },
    {
      key: 'B',
      value: 'Return to the main hall',
      action: (character) => (character.location = 'wizardTower'),
    },
  ],
};

module.exports = idle;
