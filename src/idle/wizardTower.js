const { fullHeal } = require('../helpers/combatHelpers');
const { getLocation } = require('../locations');

const location = () => ({
  ...getLocation('000001'),
  options: [
    {
      key: 'A',
      value: 'Go to the training grounds',
      action: (character) => (character.location = '000002'),
    },
    {
      key: 'B',
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
});

module.exports = location;
