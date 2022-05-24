const options = require("./options");
const slots = require("./slots");
const { questStages, characterStages } = require("./stages");
const statistics = require("./statistics");
const { masteryThresholds } = require("./thresholds");
const { itemTypes, spellTypes, attackTypes } = require("./types");
const types = require("./types");

module.exports = {
  slots,
  statistics,
  questStages,
  spellTypes,
  characterStages,
  itemTypes,
  masteryThresholds,
  attackTypes,
  options,
  quests: {
    aFirstEncounter: {
      name: 'A first encounter',
      requirements: {
        statistics: {

        },
        quests: [],
      },
      statistics: { EXP: 25, STR: 1, DEF: 1, SPD: 1 },
      items: [{ name: 'coin', amount: 50 }],
    },
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

     You receive:[STATISTICS][ITEMS]
    `,
  },
  helpPage: `
    Welcome to RPG Simulator

    This page is here to help you understand what you can do to play this game.
    Some options are allowed to use to speed up the process for the sake of creating content instead of playing the game.

    --help, -h                this command is used to display this message.
    --no-clean-console, -c    this command is used to make the game display all messages
    --stall, -s               this command is used to set the stall message to 0.1 to make it seem that all messages are dropped immediatly,
    --auto, -a                this command is used to set the auto-attack option available
  `,
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
  storyStallTime: 3,
  fightStallTime: 1.5,
}