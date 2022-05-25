const { v4: uuid } = require('uuid');
const { getItem } = require('../items');

const addInventoryItem = (character, itemId, amount) => {
  const inventoryItem = { key: uuid(), itemId, amount };
  character.inventory.push(inventoryItem);
  return inventoryItem;
};

const addDropToInventory = (character, itemId, amount) => {
  const item = getItem(itemId);
  if (item.stackable) {
    // find the inventory if it is stackable and add the value
    const inventoryItem = character.inventory.find((f) => f.itemId === itemId);
    if (inventoryItem) {
      inventoryItem.amount += amount;
      return inventoryItem;
    }
  }
  return addInventoryItem(character, itemId, amount);
};

const swapInventoryToSlot = (character, inventoryItem, slot) => {
  const toSwap = getItem(inventoryItem.itemId);

  if (!toSwap.slot.includes(slot)) {
    console.log('You cannot wield that item in that slot');
    return;
  }
  character.inventory.splice(
    character.inventory.findIndex((f) => f.key === inventoryItem.key),
    1,
  );
  if (character.gear[slot]) {
    addDropToInventory(character, character.gear[slot], 1);
  }
  character.gear[slot] = inventoryItem.itemId;
};

module.exports = {
  addDropToInventory,
  swapInventoryToSlot,
};
