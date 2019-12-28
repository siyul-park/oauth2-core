const crypto = require('crypto');

function generateSecret(length = 32) {
  return crypto.randomBytes(length / 2).toString('hex');
}

module.exports = generateSecret;
