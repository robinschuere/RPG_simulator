module.exports = {
  wieldSlots: {
    HEAD: 'HEAD',
    NECK: 'NECK',
    SHOULDERS: 'SHOULDERS',
    BODY: 'BODY',
    LEGS: 'LEGS',
    CAPE: 'CAPE',
    LEFTHAND: 'LEFTHAND',
    LEFTRING: 'LEFTRING',
    RIGHTHAND: 'RIGHTHAND',
    RIGHTRING: 'RIGHTRING',
    FEET: 'FEET',
  },
  stats: {
    EXP: 'EXP',
    HEA: 'HEA',
    STR: 'STR',
    WIS: 'WIS',
    DEX: 'DEX',
    INT: 'INT',
    DEF: 'DEF',
    ACC: 'ACC',
    SPD: 'SPD',
  },
  questStages: {
    started: 'started',
    completed: 'completed',
  },
  quests: {
    aFirstEncounter: {
      name: 'A first encounter',
      stats: { EXP: 25, STR: 1, DEF: 1, SPD: 1 },
      items: [{ name: 'coin', amount: 50 }],
    },
  },
  spellTypes: {
    offensive: 'offensive',
    defensive: 'defensive',
    utility: 'utility',
  },
  stages: {
    introduction: 'introduction',
    idle: 'idle',
    training: 'training',
  },
  itemTypes: {
    physical: 'physical',
    arcane: 'arcane',
    physicalDefensive: 'physicalDefensive',
    arcaneDefensive: 'arcaneDefensive',
  },
  defeatedRaceThresholds: {
    10: { name: '[NAME] Tracker', STR: 5, INT: 5 },
    50: { name: '[NAME] Hound', WIS: 5, DEF: 5 },
    100: {
      name: '[NAME] Impaler',
      STR: 5,
      INT: 5,
      WIS: 5,
      DEF: 5,
      ACC: 5,
    },
    500: {
      name: 'Adept Slayer of [NAME]',
      STR: 5,
      INT: 5,
      WIS: 5,
      DEF: 5,
      ACC: 5,
      DEX: 5,
      SPD: 5,
    },
    1000: {
      name: 'Slayer of [NAME]s',
      STR: 5,
      INT: 5,
      WIS: 5,
      DEF: 5,
      ACC: 5,
      DEX: 5,
      SPD: 5,
    },
    10000: {
      name: 'Master Slayer of [NAME]s',
      STR: 5,
      INT: 5,
      WIS: 5,
      DEF: 5,
      ACC: 5,
      DEX: 5,
      SPD: 5,
    },
    100000: {
      name: 'Grandmaster Slayer of [NAME]s',
      STR: 10,
      INT: 10,
      WIS: 10,
      DEF: 10,
      ACC: 5,
      DEX: 5,
      SPD: 5,
    },
  },
  attackTypes: {
    dodged: 'dodged',
    hit: 'hit',
    missed: 'missed',
    deflected: 'deflected',
    retaliated: 'retaliated',
    avoided: 'avoided',
    avoidFailed: 'avoidFailed',
  },
  infoCard: {
    general: `
    [~~~~~~~~~~~~~~INFOCARD~~~~~~~~~~~~~~]
     NAME: [NAME] RACE: [RACE]
     A [SEX] from [WORLD].
     ====================================
     LVL: [LVL]  EXP: [EXP]/[NEXTEXP]([TOTALEXP])
     HP: [HP]/[MAXHP]
     mana: [MANA]/[MAXMANA]
     ====================================[INSERTLEVELSHERE][INSERTGEARHERE][INSERTITEMSHERE]
    [~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~]
    `,
    levels: `\n
     LEVELS
     ------
     HEA: [HEA]   STR: [STR]   WIS: [WIS]
     DEX: [DEX]   INT: [INT]   DEF: [DEF]
     ACC: [ACC]   SPD: [SPD]
     ====================================
    `,
    gear: `\n
     GEAR
     ----
     HEAD: [HEAD]
     NECK: [NECK]
     SHOULDERS: [SHOULDERS]
     BODY: [BODY]
     LEGS: [LEGS]
     CAPE: [CAPE]
     LEFTHAND: [LEFTHAND]
     LEFTRING: [LEFTRING]
     RIGHTHAND: [RIGHTHAND]
     RIGHTRING: [RIGHTRING]
     FEET: [FEET]
     ====================================
    `,
    calculations: `\n
     STATISTICS
     ----------
     Physical offence: [PhysicalOffence]
     Arcane offence: [ArcaneOffence]
    `,
    spells: `
     SPELLS
     ------
     [INSERTSPELLSHERE]
    `,
    questMessage: `
     Congratulations upon completing the quest [NAME].

     You receive:[STATS][ITEMS]
    `,
  },
  defaultValues: {
    stage: 'introduction',
    location: 'wizardTower',
    LVL: 1,

    EXP: 0,
    NEXTEXP: 0,
    TOTALEXP: 0,

    HP: 0,
    MAXHP: 0,
    MANA: 0,
    MAXMANA: 0,

    HEA: 0,
    STR: 0,
    WIS: 0,
    DEX: 0,
    INT: 0,
    DEF: 0,
    ACC: 0,
    SPD: 0,

    gear: {},
    inventory: [],
    defeatedRaces: [],
    magicalProperties: [],
    quests: {},
  },
  lists: {
    attack: [
      { key: [undefined, '1'], value: 'Attack him' },
      { key: '2', value: 'Run' },
      { key: 'A', value: 'Auto-attack' },
    ],
    stat: [
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
        value: 'Human', // jack of all trades
        raisedStats: {
          HEA: 3,
          STR: 3,
          WIS: 3,
          DEX: 3,
          INT: 3,
          DEF: 3,
          ACC: 3,
          SPD: 3,
        },
        affinities: ['wizard', 'guard', 'rogue'],
      },
      {
        key: 'B',
        value: 'Elf',
        raisedStats: {
          HEA: 5,
          STR: 1,
          WIS: 5,
          DEX: 1,
          INT: 5,
          DEF: 1,
          ACC: 5,
          SPD: 1,
        },
        affinities: ['wizard'],
      },
      {
        key: 'C',
        value: 'Dwarf',
        raisedStats: {
          HEA: 5,
          STR: 5,
          WIS: 5,
          DEX: 1,
          INT: 1,
          DEF: 5,
          ACC: 1,
          SPD: 1,
        },
        affinities: ['guard'],
      },
      {
        key: 'E',
        value: 'Dauntir',
        raisedStats: {
          HEA: 1,
          STR: 5,
          WIS: 1,
          DEX: 5,
          INT: 1,
          DEF: 1,
          ACC: 5,
          SPD: 5,
        },
        affinities: ['rogue'],
      },
    ],
  },
};
