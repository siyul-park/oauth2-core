const validateAndGetClientIdentifier = require('./validate-and-get-client-identifier');

async function generateAccessToken(request) {
  await validateAndGetClientIdentifier(request);
}

module.exports = generateAccessToken;
