const { options, storyStallTime, narrators } = require('../constants');
const {
  systemMessage,
  characterMessage,
  npcMessage,
} = require('../helpers/messages');
const staller = require('../helpers/staller');

const stories = {
  introduction: require('./introduction'),
};

const printStoryMessage = (character, value, options) => {
  if (value.narrator === narrators.SYSTEM) {
    systemMessage(value.message);
  } else if (value.narrator === narrators.YOU) {
    characterMessage(character, value.message);
  } else {
    npcMessage(value.narrator, value.message);
  }
};

const printCustomStoryMessage = (character, value, options) => {
  if (value.narrator === narrators.SYSTEM) {
    systemMessage(value.messageWithParams(character));
  } else if (value.narrator === narrators.YOU) {
    characterMessage(character, value.messageWithParams(character));
  } else {
    npcMessage(value.narrator, value.messageWithParams(character));
  }
};

const runStory = async (character, stop, { stall, doNotCleanConsole }) => {
  const story = stories[character.stage];
  if (!story) {
    throw new Error('This story is not written yet!');
  }
  for (let index = 0; index < story.length; index++) {
    const val = story[index];
    if (val.message) {
      printStoryMessage(character, val, options);
      await staller(stall || val.stall || storyStallTime);
    } else if (val.messageWithParams) {
      printCustomStoryMessage(character, val, options);
      await staller(stall || val.stall || storyStallTime);
    } else if (val.stall) {
      await staller(stall || val.stall);
    } else if (val.action) {
      await val.action(character);
    }
  }
  if (!doNotCleanConsole) {
    console.clear();
  }
  return character;
};

module.exports = {
  runStory,
};
