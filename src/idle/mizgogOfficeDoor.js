const idle = {
  name: `Mizgog's office`,
  options: [
    {
      key: 'A',
      value: 'Return to the main hall',
      action: (character) => (character.location = 'wizardTower'),
    },
  ],
};

module.exports = idle;
