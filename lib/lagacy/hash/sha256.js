const crypto = require('crypto');
const algorithms = require('../algorithm/pool');

function sha256(value) {
  const sha = crypto.createHash('sha256');
  sha.update(value);

  return sha.digest('hex');
}

algorithms.set('sha256', sha256);

module.exports = sha256;
