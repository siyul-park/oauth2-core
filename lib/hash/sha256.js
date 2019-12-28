const crypto = require('crypto');

function sha256(value) {
  const sha = crypto.createHash('sha256');
  sha.update(value);

  return sha.digest('hex');
}

module.exports = sha256;
