const {
  freeAction,
  confirmAction,
  optionAction,
} = require('../helpers/promptActions');
const {
  addDropToInventory,
  swapItemFromInventoryToWieldingSlot,
} = require('../helpers/inventoryHelpers');
const { options, slots, quests, statistics } = require('../constants');
const { elevateCharacterStatistics, getGenderLabel } = require('../helpers/characterHelpers');
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

const changeName = (character) => changeCharacterParameter(character, 'name', '', 'your name');
const changeWorld = (character) => changeCharacterParameter(character, 'world', '', 'your world');


const complete = async (character) => {
  const c = await confirmAction();
  if (c) {
    const race = options.race.find((f) => f.key === character.race);
    character.stage = 'idle';
    character.location = 'wizardTower';
    const raceElevationStatistics = elevation.find(s => s.key === character.race);
    await elevateCharacterStatistics(character, [
      { statName: statistics.HEA, value: raceElevationStatistics.raisedStatistics.HEA },
      { statName: statistics.STR, value: raceElevationStatistics.raisedStatistics.STR },
      { statName: statistics.WIS, value: raceElevationStatistics.raisedStatistics.WIS },
      { statName: statistics.INT, value: raceElevationStatistics.raisedStatistics.INT },
      { statName: statistics.DEX, value: raceElevationStatistics.raisedStatistics.DEX },
      { statName: statistics.DEF, value: raceElevationStatistics.raisedStatistics.DEF },
      { statName: statistics.ACC, value: raceElevationStatistics.raisedStatistics.ACC },
      { statName: statistics.SPD, value: raceElevationStatistics.raisedStatistics.SPD },
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
  const pants = addDropToInventory(character, { name: 'leatherPants', amount: 1 });
  const boots = addDropToInventory(character, { name: 'leatherBoots', amount: 1 });
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
    narrator: 'System',
    message:
      'The smell of smoke and blood fills your nose and you feel like you made one hell of a trip.',
  },
  {
    narrator: 'System',
    message:
      'You open your eyes and see an old grey bearded man towering over you.',
  },
  {
    narrator: 'System',
    message: 'You finally grasp that you are no longer in your house.',
  },
  {
    narrator: 'System',
    message: 'Rather, you lay down on a table in a dim litted room.',
  },
  {
    narrator: 'System',
    message:
      'The man starts talking. However, you cannot make anything of the sounds he throws at you.',
  },
  {
    narrator: 'A strange man',
    message:
      'Hoor ah, Acantrr Taraask sinteluer chara vaan tghaar s eghoom ternili vlatos.',
  },
  {
    narrator: 'System',
    message: 'The man abruptly stops talking, looks at you and sighs.',
  },
  {
    narrator: 'System',
    message:
      'The man grabs a staff that lays on a nearby table and points it at you. A pale blue light forms aroung the head of the staff.',
  },
  {
    narrator: 'System',
    message:
      'Excrutiating pain goes through your skull. You feel how your body gets lifted until only your hands and heels are on the table.',
  },
  {
    narrator: 'System',
    message:
      'After what seemed like a very long time, you feel how the pain subdues.',
  },
  {
    narrator: 'A strange man',
    message: 'How are you feeling?',
  },
  {
    narrator: 'System',
    message:
      'Still flabbergasted, you can only look at the man. You start blabbering. The staff starts turning red...',
  },
  {
    narrator: 'System',
    message:
      'You feel how something gets a hold of your voice. Clearly you state your name.',
  },
  { action: changeName },
  {
    narrator: 'A strange man',
    messageWithParams: (character) =>
      `So your name is ${character.name}. Wonderfull.`,
  },
  {
    narrator: 'System',
    message:
      'Before you can correctly react, the next thing you feel that crosses your lips is what gender you have.',
  },
  { action: changeGender },
  {
    narrator: 'System',
    message: 'Followed by the place you come from...',
  },
  { action: changeWorld },
  {
    narrator: 'Mizgog',
    messageWithParams: (character) =>
      `And you are a ${getGenderLabel(character)} from ${
        character.world
      }. This is so exciting.`,
  },
  {
    narrator: 'System',
    message: 'You see the red light from the staff starving away.',
  },
  {
    narrator: 'A strange man',
    message:
      'Where are my manners. I go by Mizgog. The Archmage of Tyrangael. A grand city of Kuramzo.',
  },
  {
    narrator: 'Mizgog',
    message:
      'I am terribly sorry for that painfull spell, but it was the only way to make you understand my language.',
  },
  {
    narrator: 'Mizgog',
    message: 'Now. There is a reason why you are here ... Let me quickly...',
  },
  {
    narrator: 'System',
    message:
      'The man again lifts his staff. This time, you jump from the table',
  },
  {
    narrator: 'you',
    message: 'NO! Put that thing down',
  },
  {
    narrator: 'System',
    message: 'Mizgog stops his motion and looks at you.',
  },
  {
    narrator: 'Mizgog',
    messageWithParams: (character) =>
      `Oh, you don't have to worry ${character.name} of ${character.world}.`,
  },
  {
    narrator: 'Mizgog',
    message: 'You see, I wanted to check on your soul affinities.',
  },
  {
    narrator: 'Mizgog',
    message: 'Your body as of now is but a mere vessel',
  },
  {
    narrator: 'Mizgog',
    message:
      'The vessel is now fueled by my magic. But that drain is of such a high rate that I am not able to maintain it very long. ',
  },
  {
    narrator: 'Mizgog',
    message:
      'After I run out of my mana, your vessel will break and your soul will die.',
  },
  {
    narrator: 'Mizgog',
    message:
      'Luckily, I learned through scrolls provided by my ancestor Trask how to capture the affinity and imbue the vessel',
  },
  {
    narrator: 'Mizgog',
    message:
      'The way I see it you have no options. So stop being a scaredy cat and let me perform the ritual.',
  },
  {
    narrator: 'you',
    message: 'Fine. Just get it over with.',
  },
  {
    narrator: 'System',
    message:
      'Once again, the man lifts his staff. This time however you feel how your consciousness starts lifting up.',
  },
  {
    narrator: 'System',
    message:
      'Images of figures start springing in your minds eye untill you can make out their features.',
  },
  {
    narrator: 'System',
    message: 'The most prominent feature reaches out his hand to you.',
  },
  { action: changeRace },
  {
    narrator: 'Mizgog',
    message:
      'Wonderfull. I will now teach you the spell so you can see what your affinity is!',
  },
  {
    narrator: 'System',
    message: 'The man teaches you the spell "Check My statzz".',
  },
  { action: learnSpell },
  { action: getCharacterCard },
  {
    narrator: 'System',
    message: 'Do you accept these values?',
  },
  { action: complete },
  {
    narrator: 'Mizgog',
    message:
      'Now that we have this out of the way. Perhaps I should give you some clothings. Since, you are totally naked.',
  },
  {
    narrator: 'System',
    message:
      'You turn red as that was untill this moment the least of you concerns.',
  },
  {
    action: giveEquipment,
  },
  { action: save },
];

module.exports = story;
