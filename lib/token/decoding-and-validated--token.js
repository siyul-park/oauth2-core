const decodingToken = require('./decoding-token');
const validateToken = require('../validate/validate-token');

const { InvalidTokenError } = require('../error');
const errorPool = require('../error/pool');

function decodingAndValidatedToken(encodingToken, tokenExpect = {}) {
  const token = decodingToken(encodingToken, errorPool.get(InvalidTokenError));
  validateToken(token, tokenExpect);

  return token;
}

module.exports = decodingAndValidatedToken;
