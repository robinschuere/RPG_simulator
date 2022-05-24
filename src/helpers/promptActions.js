const { prompt } = require('enquirer');

const translateKey = (key) => {
  if (Array.isArray(key)) {
    return key.map((k) => (k ? k : 'ENTER')).join(', ');
  }
  return key;
};

const quitAction = async () => {
  const response = await prompt({
    type: 'input',
    name: 'quit',
    message:
      'Are you sure you want to quit? Type [Y]es to stop the game. Any other entry will resume the game.',
  });
  return ['Y', 'YES'].includes(response.quit.toUpperCase());
};

const confirmAction = async (message = '') => {
  const response = await prompt({
    type: 'input',
    name: 'confirm',
    message: `${message}\n(type [Y]es or [N]o to continue)`,
  });
  return ['', 'Y', 'YES'].includes(response.confirm.toUpperCase());
};

/**
 * 
 * @param {String} message the message that will be displayed
 * @param {String} info 
 * @returns {String}
 */
const freeAction = async (message = '', info = 'anything') => {
  const response = await prompt({
    type: 'input',
    name: 'free',
    message: `${message ? `${message}\n`: ''}(type ${info} and press ENTER)`,
  });
  return response.free;
};

const optionAction = async (message, options) => {
  const mappedOptions = options
    .map((f) => `[${translateKey(f.key)}]: ${f.description || f.value}`)
    .join('\n');
  const response = await prompt({
    type: 'input',
    name: 'options',
    message: `${message}\n${mappedOptions}\n(select an option to continue)`,
  });
  const selected = response.options.toUpperCase().split('')[0];
  const option = options.find((f) =>
    Array.isArray(f.key) ? f.key.includes(selected) : f.key === selected,
  );
  return option || optionAction(message, options);
};

module.exports = {
  quitAction,
  confirmAction,
  freeAction,
  optionAction,
};
