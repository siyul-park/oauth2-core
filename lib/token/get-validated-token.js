const decodingToken = require('./decoding-token');

const {
  InvalidRequestError, InvalidTokenError, InvalidScopeError,
} = require('../error');
const errorPool = require('../error/pool');

const validateRequired = require('../validate/validate-required');
const validateScope = require('../validate/validate-scope');

function getValidatedToken(encodingToken, { subject, issuer, scope }) {
  const token = decodingToken(encodingToken);

  if (subject && token.subject !== subject) throw errorPool.get(InvalidTokenError);
  if (issuer && token.issuer !== issuer) throw errorPool.get(InvalidTokenError);

  validateRequired(token.scope, errorPool.get(InvalidRequestError));
  validateScope(token.scope, scope, errorPool.get(InvalidScopeError));

  return token;
}

module.exports = getValidatedToken;
