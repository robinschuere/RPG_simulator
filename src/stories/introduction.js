const {
  freeAction,
  confirmAction,
  optionAction,
} = require('../helpers/promptActions');
const {
  addDropToInventory,
  swapItemFromInventoryToWieldingSlot,
} = require('../helpers/inventoryHelpers');
const {
  options,
  slots,
  quests,
  statistics,
  narrators,
} = require('../constants');
const {
  elevateCharacterStatistics,
  getGenderLabel,
} = require('../helpers/characterHelpers');
const { getCharacterCard } = require('../helpers/textHelpers');
const { startQuest } = require('../helpers/questHelpers');
const { saveCharacter } = require('../helpers/fileHelpers');

const elevation = [
  {
    key: 'A',
    raisedStatistics: {
      HEA: 3,
      STR: 3,
      WIS: 3,
      DEX: 3,
      INT: 3,
      DEF: 3,
      ACC: 3,
      SPD: 3,
    },
  },
  {
    key: 'B',
    raisedStatistics: {
      HEA: 5,
      STR: 1,
      WIS: 5,
      DEX: 1,
      INT: 5,
      DEF: 1,
      ACC: 5,
      SPD: 1,
    },
  },
  {
    key: 'C',
    raisedStatistics: {
      HEA: 5,
      STR: 5,
      WIS: 5,
      DEX: 1,
      INT: 1,
      DEF: 5,
      ACC: 1,
      SPD: 1,
    },
  },
  {
    key: 'E',
    raisedStatistics: {
      HEA: 1,
      STR: 5,
      WIS: 1,
      DEX: 5,
      INT: 1,
      DEF: 1,
      ACC: 5,
      SPD: 5,
    },
  },
];

const changeCharacterParameter = async (character, parameter, msg, info) => {
  const r = await freeAction(msg, info);
  character[parameter] = r;
  return character;
};

const changeGender = async (character) => {
  const r = await optionAction('', options.gender);
  character.gender = r.key;
  return character;
};

const changeRace = async (character) => {
  const r = await optionAction('', options.race);
  character.race = r.key;
  return character;
};

const changeName = (character) =>
  changeCharacterParameter(character, 'name', '', 'your name');
const changeWorld = (character) =>
  changeCharacterParameter(character, 'world', '', 'your world');

const complete = async (character) => {
  const c = await confirmAction();
  if (c) {
    const race = options.race.find((f) => f.key === character.race);
    character.stage = 'idle';
    character.location = 'wizardTower';
    const raceElevationStatistics = elevation.find(
      (s) => s.key === character.race,
    );
    await elevateCharacterStatistics(character, [
      {
        statName: statistics.HEA,
        value: raceElevationStatistics.raisedStatistics.HEA,
      },
      {
        statName: statistics.STR,
        value: raceElevationStatistics.raisedStatistics.STR,
      },
      {
        statName: statistics.WIS,
        value: raceElevationStatistics.raisedStatistics.WIS,
      },
      {
        statName: statistics.INT,
        value: raceElevationStatistics.raisedStatistics.INT,
      },
      {
        statName: statistics.DEX,
        value: raceElevationStatistics.raisedStatistics.DEX,
      },
      {
        statName: statistics.DEF,
        value: raceElevationStatistics.raisedStatistics.DEF,
      },
      {
        statName: statistics.ACC,
        value: raceElevationStatistics.raisedStatistics.ACC,
      },
      {
        statName: statistics.SPD,
        value: raceElevationStatistics.raisedStatistics.SPD,
      },
      { statName: statistics.EXP, value: 50 },
    ]);

    startQuest(character, quests.aFirstEncounter);

    return character;
  } else {
    await changeCharacterParameter(
      character,
      'name',
      'How would you like to be called?',
    );
    await changeGender(character);
    await changeCharacterParameter(
      character,
      'world',
      'Were do you come from?',
    );
    await changeRace(character);
    await complete(character);
  }
};

const learnSpell = (character) => {
  character.magicalProperties.push({
    name: 'checkMyStatzz',
    lvl: 1,
  });
  return character;
};

const giveEquipment = (character) => {
  addDropToInventory(character, { name: 'coin', amount: 5 });
  const shortSword = addDropToInventory(character, {
    name: 'ironShortSword',
    amount: 1,
  });
  const tunic = addDropToInventory(character, { name: 'tunic', amount: 1 });
  const pants = addDropToInventory(character, {
    name: 'leatherPants',
    amount: 1,
  });
  const boots = addDropToInventory(character, {
    name: 'leatherBoots',
    amount: 1,
  });
  swapItemFromInventoryToWieldingSlot(character, shortSword, slots.RIGHTHAND);
  swapItemFromInventoryToWieldingSlot(character, tunic, slots.BODY);
  swapItemFromInventoryToWieldingSlot(character, pants, slots.LEGS);
  swapItemFromInventoryToWieldingSlot(character, boots, slots.FEET);
};

const save = async (character) => {
  const confirm = await confirmAction('Would you like to save your character?');
  if (confirm) {
    await saveCharacter(character);
  }
  return character;
};

const story = [
  {
    narrator: narrators.SYSTEM,
    message:
      'The smell of smoke and blood fills your nose and you feel like you made one hell of a trip.',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'You open your eyes and see an old grey bearded man towering over you.',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'You finally grasp that you are no longer in your house but that you lay down on a table in a dimly lit room',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'The man starts talking. However, you do not understand a word he speaks.',
  },
  {
    narrator: 'A strange man',
    message:
      'Hoor ah, Acantrr Taraask sinteluer chara vaan tghaar s eghoom ternili vlatos.',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'The man abruptly stops talking, looks at you and stomps his head. Quickly he turns around to grab a staff laying on a nearby table',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'You see the man weaving his hands around the head of the staff. A pale blue shimmering light surrounds the man as he steps towards you.',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'Excrutiating pain goes through your skull. You feel how your body is lifted until only your hands and heels are on the table. As if that was not enough, you feel the staff on your forehead.\nYou feel like your head is about to explode.',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'As sudden pain occurred, as soon as the contact with the staff is broken, the pain goes away.',
  },
  {
    narrator: 'A strange man',
    message: 'How are you feeling?',
  },
  {
    narrator: narrators.SYSTEM,
    message: 'Words start mumbling out of your mouth.',
  },
  {
    narrator: narrators.YOU,
    message: 'What ....',
  },
  {
    narrator: narrators.YOU,
    message: 'How did you',
  },
  {
    narrator: narrators.YOU,
    message: 'What did you do to me?',
  },
  {
    narrator: 'a strange man',
    message:
      'I will not tell you that, however, would you like me to tell me your name?',
  },
  { action: changeName },
  {
    narrator: 'A strange man',
    messageWithParams: (character) =>
      `So your name is ${character.name}. Wonderfull. Could you tell me of what world you are? And please, how they call your gender?`,
  },
  { action: changeWorld },
  { action: changeGender },
  {
    narrator: 'Mizgog',
    messageWithParams: (character) =>
      `And you are a ${getGenderLabel(character)} from ${
        character.world
      }. This is so exciting.`,
  },
  {
    narrator: 'A strange man',
    message:
      'Where are my manners. I summon you to this place, I perform an ancient translator spell which I can only presume hurts a lot. I am terribly sorry for that. I go by Mizgog. The Archmage of Tyrangael. A grand city of Kuramzo.',
  },
  {
    narrator: 'Mizgog',
    message: 'Now. There is a reason why you are here ... Let me quickly...',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'The man again points his staff at your chest. This time, you jump from the table',
  },
  {
    narrator: narrators.YOU,
    message: 'NO! Put that thing down. NOW!',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'Mizgog stops his motion and looks at you. You see no form of hesitation in his eyes.',
  },
  {
    narrator: 'Mizgog',
    messageWithParams: (character) =>
      `Oh, you don't have to worry ${character.name} of ${character.world}.`,
  },
  {
    narrator: 'Mizgog',
    message:
      'You see, I wanted to check on your soul affinities. Your body as of now is but a mere vessel. Bound by nothing more than my magic essence.',
  },
  {
    narrator: 'Mizgog',
    message:
      'Alas, even as the Archmage, my magic essence is not unlimited and soon the vessel will break by which your soul shall perish.',
  },
  {
    narrator: 'Mizgog',
    message:
      'However, thanks to my master, I learned how to create a more robust vessel. One that must be fueled, but no longer by magical essence.',
  },
  {
    narrator: 'Mizgog',
    message:
      'The way I see it you have no options, or your soul perishes, or you let me perform the ritual. This is a more unique ritual, which will not hurt you as the ancients magic did. The spell will give you insight in who you can become, and will point you to a creature of this world.',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'You ponder for a moment what you should do. You are not completely fine with the progress of things, but finaly, you accept.',
  },
  {
    narrator: narrators.YOU,
    message: 'Fine. Just get it over with.',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'Mizgog raises his staff and touches your forehead again. This time however you feel like your mind is expanding.',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'Images of figures start springing in your minds eye until you make out their features. The most prominent figure reaches out his hand to you.',
  },
  { action: changeRace },
  {
    narrator: 'Mizgog',
    message:
      'Wonderfull. I will now teach you the spell so you can see what your affinity is!',
  },
  {
    narrator: narrators.SYSTEM,
    message: 'The man teaches you the spell "Check My statzz".',
  },
  { action: learnSpell },
  { action: getCharacterCard },
  {
    narrator: narrators.SYSTEM,
    message: 'Do you accept these values?',
  },
  { action: complete },
  {
    narrator: 'Mizgog',
    message:
      'Now that we have this out of the way. Perhaps I should give you some clothings. Since, you are totally naked.',
  },
  {
    narrator: narrators.SYSTEM,
    message:
      'You turn red as that was untill this moment the least of you concerns.',
  },
  {
    action: giveEquipment,
  },
  { action: save },
];

module.exports = story;
