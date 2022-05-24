const { fullHeal } = require('../helpers/combatHelpers');

const idle = {
  name: 'the Wizard Tower',
  options: [
    {
      key: 'A',
      value: 'Go see Mizgog',
      action: (character) => (character.location = 'mizgogOfficeDoor'),
    },
    {
      key: 'B',
      value: 'Go see the trader',
      action: (character) => (character.location = 'wizardTowerGeneralStore'),
    },
    {
      key: 'C',
      value: 'Go to the training grounds',
      action: (character) =>
        (character.location = 'wizardTowerTrainingGrounds'),
    },
    {
      key: 'D',
      value: 'Check the statue',
      action: (c) => {
        fullHeal(c);
        console.log(
          'The plague on the statue reads: "A Depiction of Grand Arch mage Trask" A magical breeze surrounds you and heals you completely.'
            .red,
        );
      },
    },
  ],
};

module.exports = idle;
