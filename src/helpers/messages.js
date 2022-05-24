const systemMessage = (message) => {
  console.log(`SYSTEM: ${message}`.red);
};

const arenaStatusMessage = (message) => {
  console.log(message.bgGreen.black);
};

const arenaDamageMessage = (message) => {
  console.log(message.bgRed.white);
};

const arenaAnyMessage = (message) => {
  console.log(message.bgWhite.black);
};

const npcMessage = (narrator, message) => {
  console.log(`${narrator}: ${message}`.blue);
};

const characterMessage = (message) => {
  console.log(`${message}`.white);
};

module.exports = {
  systemMessage,
  npcMessage,
  characterMessage,
  arenaStatusMessage,
  arenaDamageMessage,
  arenaAnyMessage,
};
