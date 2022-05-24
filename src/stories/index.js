const {
  systemMessage,
  characterMessage,
  npcMessage,
} = require('../helpers/messages');
const staller = require('../helpers/staller');

const stories = {
  introduction: require('./introduction'),
};

const runStory = async (character, { stall = 3 }) => {
  const story = stories[character.stage];
  if (!story) {
    throw new Error('This story is not written yet!');
  }
  for (let index = 0; index < story.length; index++) {
    const val = story[index];
    if (val.message) {
      if (val.narrator === 'System') systemMessage(val.message);
      else if (val.narrator === 'you') characterMessage(val.message);
      else npcMessage(val.narrator, val.message);
      await (val.stall ? staller(val.stall) : staller(stall));
    } else if (val.messageWithParams) {
      if (val.narrator === 'System')
        systemMessage(val.messageWithParams(character));
      else if (val.narrator === 'you')
        characterMessage(val.messageWithParams(character));
      else npcMessage(val.narrator, val.messageWithParams(character));
      await (val.stall ? staller(val.stall) : staller(stall));
    } else if (val.action) {
      await val.action(character);
    }
  }
  return character;
};

module.exports = {
  runStory,
};
