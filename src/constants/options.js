module.exports = {
  attack: [
    { key: [undefined, '1'], value: 'Attack him' },
    { key: '2', value: 'Run' },
  ],
  statistics: [
    {
      key: '1',
      value: 'HEA',
      description: 'HEA: Health (for boosting ones health)',
    },
    {
      key: '2',
      value: 'STR',
      description: 'STR: Strenght (Used for physical damage)',
    },
    {
      key: '3',
      value: 'WIS',
      description: 'WIS: Wisdom (Used for arcane defence)',
    },
    {
      key: '4',
      value: 'DEX',
      description: 'DEX: Dexterity (used for dodging chance)',
    },
    {
      key: '5',
      value: 'INT',
      description: 'INT: Intelligence (used for arcana damage)',
    },
    {
      key: '6',
      value: 'DEF',
      description: 'DEF: Defence (used for physical defence)',
    },
    {
      key: '7',
      value: 'ACC',
      description: 'ACC: Accuracy (used for defining hit chance)',
    },
    {
      key: '8',
      value: 'SPD',
      description: 'SPD: Speed (used for combat starting point)',
    },
  ],
  gender: [
    { key: 'M', value: 'Male' },
    { key: 'F', value: 'Female' },
  ],
  race: [
    {
      key: 'A',
      value: 'Human',
      selectable: true,
    },
    {
      key: 'B',
      value: 'Elf',
      selectable: true,
    },
    {
      key: 'C',
      value: 'Dwarf',
      selectable: true,
    },
    {
      key: 'D',
      value: 'Dauntir',
    },
  ],
};
