const crypto = require('crypto');
const config = require('../../config');

function sha1(value) {
  const sha = crypto.createHash('sha1');
  sha.update(value);

  return sha.digest('hex');
}

function generateIdentifier(length = 32) {
  const timeLength = config.get('timeLength');

  const id = crypto.randomBytes((length - timeLength) / 2).toString('hex');

  const hashedTime = sha1(Date.now().toString(16));
  const time = hashedTime.slice(hashedTime.length - timeLength, hashedTime.length);

  return `${id}${time}`;
}

module.exports = generateIdentifier;
