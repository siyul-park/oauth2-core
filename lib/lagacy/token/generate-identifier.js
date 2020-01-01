const generateIdentifier = require('../hash/generate-identifier');
const config = require('../config');

const algorithms = require('../algorithm/pool');

function generateTokenIdentifier(length = 32) {
  const timeLength = config.get('tokenIdentifierTimeLength');

  return generateIdentifier(length, timeLength);
}

algorithms.set('generateTokenIdentifier', generateTokenIdentifier);

module.exports = generateTokenIdentifier;
