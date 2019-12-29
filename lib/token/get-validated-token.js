const decodingToken = require('./decoding-token');

const {
  InvalidRequestError, InvalidTokenError, InvalidScopeError,
} = require('../error');
const errorPool = require('../error/pool');

const validateRequired = require('../validate/validate-required');
const validateScope = require('../validate/validate-scope');

const config = require('../config');

function getValidatedToken(encodingToken, tokenExpect = {}) {
  const token = decodingToken(encodingToken, errorPool.get(InvalidTokenError));

  if (token.iss !== config.get('issuer')) throw errorPool.get(InvalidTokenError);

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(tokenExpect)) {
    if (token[key] !== value) throw errorPool.get(InvalidTokenError);
  }

  validateRequired(token.scope, errorPool.get(InvalidRequestError));
  // eslint-disable-next-line max-len
  if (tokenExpect.scope) validateScope(token.scope, tokenExpect.scope, errorPool.get(InvalidScopeError));

  return token;
}

module.exports = getValidatedToken;
