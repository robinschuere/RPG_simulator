const { promisify } = require('util');

const sleep = promisify(setTimeout);

const staller = (time) => sleep(time * 1000);

module.exports = staller;
