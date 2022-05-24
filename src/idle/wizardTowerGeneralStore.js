const { getItem } = require('../helpers/itemHelpers');
const { sellInventoryItem } = require('../helpers/inventoryHelpers');
const { optionAction, confirmAction } = require('../helpers/promptActions');
const { hasCompletedQuest } = require('../helpers/questHelpers');
const { npcMessage } = require('../helpers/messages');

const openStore = (character) => {
  if (!hasCompletedQuest(character, 'aFirstEncounter')) {
    npcMessage(
      'Trader',
      `I'm terribly sorry. I cannot sell you anything at this moment.`,
    );
    return;
  }
};

const sellItems = async (character) => {
  let selling = true;
  const options = character.inventory
    .filter((f) => {
      const item = getItem(character, f.name);
      return !item.untradeable && !f.starred;
    })
    .map((f, idx) => {
      const item = getItem(character, f.name);
      return {
        key: idx + 1,
        value: f.key,
        description: item.name,
      };
    });
  options.push({ key: 'A', value: 'Sell everything' });
  options.push({ key: 'Q', value: 'Stop selling items' });
  while (selling) {
    const option = await optionAction(
      'What Items do you wish to sell?',
      options,
    );
    switch (option.key) {
      case 'A':
        const confirmEverything = await confirmAction(
          `Are you sure that you wish to sell everything?`,
        );
        if (confirmEverything) {
          options
            .filter((f) => !['A', 'Q'].includes(f.key))
            .forEach((f) => {
              sellInventoryItem(character, f.value);
            });
        }
        selling = false;
        break;
      case 'Q':
        selling = false;
        break;
      default:
        const confirm = await confirmAction(
          `Are you sure that you wish to sell the ${option.description}?`,
        );
        if (confirm) {
          sellInventoryItem(character, option.value);
        }
        break;
    }
  }
};

const idle = {
  name: 'the Wizard Tower General Store',
  options: [
    {
      key: 'A',
      value: 'Check wares',
      action: openStore,
    },
    {
      key: 'B',
      value: 'Sell items',
      action: sellItems,
    },
    {
      key: 'C',
      value: 'Return to the main hall',
      action: (character) => (character.location = 'wizardTower'),
    },
  ],
};

module.exports = idle;
