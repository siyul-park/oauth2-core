const validateAndGetCode = require('./validate-and-get-code');

async function generateAccessToken(request) {
  await validateAndGetCode(request);
}

module.exports = generateAccessToken;
