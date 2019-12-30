const decodingAndValidatedToken = require('./decoding-and-validated--token');

const dataAccessorPool = require('../data-accessor/pool');
const DataAccessorType = require('../data-accessor/type');

const { InvalidTokenError } = require('../error');
const errorPool = require('../error/pool');

async function decodingAndUseToken(token, tokenExpect = {}) {
  const decodingToken = decodingAndValidatedToken(token, tokenExpect);

  const activeTokenDataAccessor = dataAccessorPool.get(DataAccessorType.AUTHORIZATION_CODE);
  await activeTokenDataAccessor.use(decodingToken.jti, errorPool.get(InvalidTokenError));

  return decodingToken;
}

module.exports = decodingAndUseToken;
