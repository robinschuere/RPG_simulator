const { v4: uuid } = require('uuid');
const { getItem } = require('./itemHelpers');

const addInventoryItem = (character, drop) => {
  const inventoryItem = { key: uuid(), ...drop };
  character.inventory.push(inventoryItem);
  return inventoryItem;
};

const addDropToInventory = (character, drop) => {
  const item = getItem(character, drop.name);
  if (item.stackable) {
    // find the inventory if it is stackable and add the value
    const inventoryItem = character.inventory.find((f) => f.name === drop.name);
    if (inventoryItem) {
      inventoryItem.amount += drop.amount;
      return inventoryItem;
    }
  }
  return addInventoryItem(character, drop);
};

const swapItemFromInventoryToWieldingSlot = (
  character,
  inventoryItem,
  slot,
) => {
  const toSwap = getItem(character, inventoryItem.name);

  if (!toSwap.wieldSlot.includes(slot)) {
    console.log('You cannot wield that item in that slot');
    return;
  }
  character.inventory.splice(
    character.inventory.findIndex((f) => f.key === inventoryItem.key),
    1,
  );
  if (character.gear[slot]) {
    character.inventory.push({ ...character.gear[slot] });
  }
  character.gear[slot] = { ...inventoryItem };
};

const sellInventoryItem = (character, key) => {
  const inventoryItemIndex = character.inventory.findIndex(
    (f) => f.key === key,
  );
  const item = getItem(character, character.inventory[inventoryItemIndex].name);

  const getCoinValue = character.inventory.find((f) => f.name === 'coin');
  getCoinValue.amount += item.worth;

  character.inventory.splice(inventoryItemIndex, 1);
};

module.exports = {
  addDropToInventory,
  sellInventoryItem,
  swapItemFromInventoryToWieldingSlot,
};
