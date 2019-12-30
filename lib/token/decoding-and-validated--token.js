const decodingToken = require('./decoding-token');

const {
  InvalidRequestError, InvalidTokenError, InvalidScopeError,
} = require('../error');
const errorPool = require('../error/pool');

const validateRequired = require('../validate/validate-required');
const validateScope = require('../validate/validate-scope');

const config = require('../config');

function decodingAndValidatedToken(encodingToken, tokenExpect = {}) {
  const token = decodingToken(encodingToken, errorPool.get(InvalidTokenError));

  if (token.iss !== config.get('issuer')) throw errorPool.get(InvalidTokenError);

  validateRequired(token.scope, errorPool.get(InvalidRequestError));
  // eslint-disable-next-line max-len
  if (tokenExpect.scope) validateScope(token.scope, tokenExpect.scope, errorPool.get(InvalidScopeError));

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(tokenExpect)) {
    // eslint-disable-next-line no-continue
    if (key === 'scope') continue;
    if (token[key] !== value) throw errorPool.get(InvalidTokenError);
  }

  return token;
}

module.exports = decodingAndValidatedToken;
