const generateAuthorization = require('./generate/authorization');
const generateAuthorizationByToken = require('./generate/authorization-by-token');

const responseScope = require('./scope/response');
const requireScope = require('./scope/require');

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
