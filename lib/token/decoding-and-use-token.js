const decodingAndValidatedToken = require('./decoding-and-validated--token');

const activeTokenPool = require('./active-token/pool');
const ActiveTokenType = require('./active-token/type');

const { InvalidTokenError } = require('../error');
const errorPool = require('../error/pool');

async function decodingAndUseToken(token, tokenExpect = {}) {
  const decodingToken = decodingAndValidatedToken(token, tokenExpect);

  const activeTokenManager = activeTokenPool.get(ActiveTokenType.AUTHORIZATION_CODE);
  await activeTokenManager.use(decodingToken.jti, errorPool.get(InvalidTokenError));

  return decodingToken;
}

module.exports = decodingAndUseToken;
