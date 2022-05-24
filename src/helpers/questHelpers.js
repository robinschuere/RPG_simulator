const { addDropToInventory } = require('./inventoryHelpers');

const startQuest = (character, quest) => {
  character.quests[quest.name] = { stage: questStages.started, steps: [] };
  return character;
};

const completeQuest = async (character, name) => {
  character.quests[name] = { stage: questStages.completed };
  const quest = quests[name];
  let statsMessage = '';
  let itemMessage = '';
  if (quest) {
    Object.keys(quest.stats).forEach(async (key) => {
      character[key] += quest.stats[key];
      statsMessage += `\n${key} elevated by ${quest.stats[key]}`;
    });
    quest.items.forEach((item) => {
      addDropToInventory(character, item);
      itemMessage += `\n${item.amount} ${item.name}`;
    });
  }
  const message = infoCard.questMessage
    .replace('[NAME]', quest.name)
    .replace('[STATS]', statsMessage || '')
    .replace('[ITEMS]', itemMessage || '');
  console.log(message);
  return character;
};

const hasStartedQuest = (character, name) => {
  const quest = character.quests[name];
  return quest ? quest.stage === questStages.started || false : false;
};

const hasCompletedQuest = (character, name) => {
  const quest = character.quests[name];
  return quest ? quest.stage === questStages.completed || false : false;
};

const addQuestStep = (character, name, step) => {
  if (hasStartedQuest(character, name)) {
    const quest = character.quests[name];
    quest.steps.push(step);
  }
  return character;
};

module.exports = {
  startQuest,
  completeQuest,
  hasStartedQuest,
  hasCompletedQuest,
};
