const generateIdentifier = require('../../hash/generate-identifier');
const config = require('../../config');

function generateClientIdentifier(length = 32) {
  const userOtherGenerator = config.get('userOtherGeneratorForClientIdentifier');

  if (userOtherGenerator) return undefined;

  const timeLength = config.get('clientIdentifierTimeLength');

  return generateIdentifier(length, timeLength);
}

module.exports = generateClientIdentifier;
