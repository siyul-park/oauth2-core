const crypto = require('crypto');

const algorithms = require('../../algorithm/pool');

function generateClientSecret(length = 32) {
  return crypto.randomBytes(length / 2).toString('hex');
}

algorithms.set('generateClientSecret', generateClientSecret);

module.exports = generateClientSecret;
