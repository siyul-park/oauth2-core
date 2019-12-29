const validateAndGetToken = require('./validate-and-get-token');

async function generateAccessToken(request) {
  await validateAndGetToken(request);
}

module.exports = generateAccessToken;
