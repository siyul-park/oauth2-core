const generateIdentifier = require('../../hash/generate-identifier');
const config = require('../../config');

const algorithms = require('../../algorithm/pool');

function generateClientIdentifier(length = 32) {
  const timeLength = config.get('clientIdentifierTimeLength');

  return generateIdentifier(length, timeLength);
}

algorithms.set('generateClientIdentifier', generateClientIdentifier);

module.exports = generateClientIdentifier;
