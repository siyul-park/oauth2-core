const generateIdentifier = require('../hash/generate-identifier');
const config = require('../config');

function generateTokenIdentifier(length = 32) {
  const timeLength = config.get('tokenIdentifierTimeLength');

  return generateIdentifier(length, timeLength);
}

module.exports = generateTokenIdentifier;
