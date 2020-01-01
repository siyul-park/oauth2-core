const crypto = require('crypto');
const sha256 = require('./sha256');
const algorithms = require('../algorithm/pool');

function generateIdentifier(length = 32, timeLength = 0) {
  const id = crypto.randomBytes((length - timeLength) / 2).toString('hex');

  const hashedTime = sha256(Date.now().toString(16));
  const time = hashedTime.slice(hashedTime.length - timeLength, hashedTime.length);

  return `${id}${time}`;
}

algorithms.set('generateIdentifier', generateIdentifier);

module.exports = generateIdentifier;
