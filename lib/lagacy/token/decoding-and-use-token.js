const decodingAndValidatedToken = require('./decoding-and-validated--token');

const activeTokenPool = require('./active-token/pool');

const { InvalidTokenError } = require('../error');
const errorPool = require('../error/pool');

async function decodingAndUseToken(token, tokenExpect = {}, type) {
  const decodingToken = decodingAndValidatedToken(token, tokenExpect);

  const activeTokenManager = activeTokenPool.get(type);
  await activeTokenManager.use(decodingToken.jti, errorPool.get(InvalidTokenError));

  return decodingToken;
}

module.exports = decodingAndUseToken;
