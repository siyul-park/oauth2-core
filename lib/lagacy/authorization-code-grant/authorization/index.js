const generateAuthorization = require('./generate/generate-authorization');
const generateAuthorizationByToken = require('./generate/generate-authorization-by-token');

const responseScope = require('./scope/response-scope');
const requireScope = require('./scope/require-scope');

const scopePool = require('../../scope/pool');
const ScopeType = require('../../scope/type');

// eslint-disable-next-line max-len
scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_AUTHORIZATION.RESPONSE, responseScope);
// eslint-disable-next-line max-len
scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_AUTHORIZATION.REQUIRE, requireScope);

module.exports = {
  generate: generateAuthorization,
  generateByToken: generateAuthorizationByToken,
};
