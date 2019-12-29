const validateAndGetClient = require('./validate-and-get-client');

async function generateAccessToken(request) {
  await validateAndGetClient(request);
}

module.exports = generateAccessToken;
