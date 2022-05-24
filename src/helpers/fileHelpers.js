const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { optionAction } = require('./promptActions');

const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.stat);

const dataDirectoryPath = path.join(__dirname, '../../data');

const checkDataDirectoryToExist = async () => {
  try {
    await exists(dataDirectoryPath);
  } catch (e) {
    await mkdir(dataDirectoryPath);
    await checkDataDirectoryToExist();
  }
};

const readCharacter = async (name) => {
  const fileData = await readFile(path.join(dataDirectoryPath, name));
  return JSON.parse(fileData);
};

const saveCharacter = async (c) => {
  await checkDataDirectoryToExist();
  const fileName = `${c.id}.json`;
  await writeFile(path.join(dataDirectoryPath, fileName), JSON.stringify(c));
  console.log('Succesfully saved!'.bgGreen.black);
};

const getSaveSlots = async () => {
  try {
    const directory = await readDir(dataDirectoryPath);
    return directory;
  } catch (e) {
    return [];
  }
};

const showCharacterSelector = async () => {
  const slots = await getSaveSlots();
  const options = [];
  for (let index = 0; index < slots.length; index++) {
    const character = await readCharacter(slots[index]);
    options.push({ key: `${index + 1}`, value: character.name, character });
  }
  options.push({ key: 'N', value: 'Start new Game' });
  const option = await optionAction(
    'There already exists some game data. Which character do you want to load?',
    options,
  );
  if (option.key === 'N') {
    return undefined;
  }
  console.log('Opened save file!'.bgGreen.black);
  return option.character;
};

module.exports = {
  saveCharacter,
  getSaveSlots,
  showCharacterSelector,
};
