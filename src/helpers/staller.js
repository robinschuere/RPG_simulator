const { promisify } = require('util');

const sleep = promisify(setTimeout);

const staller = (time = 0.001) => sleep(time * 1000);

module.exports = staller;
