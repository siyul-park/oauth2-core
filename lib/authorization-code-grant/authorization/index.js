const generateAuthorization = require('./generate-authorization');
const generateAuthorizationByToken = require('./generate-authorization-by-token');

const responseScope = require('./response-scope');
const requireScope = require('./require-scope');

const scopePool = require('../../scope/pool');
const ScopeType = require('../../scope/type');

// eslint-disable-next-line max-len
scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_AUTHORIZATION_CAN_RESPONSE, responseScope);
// eslint-disable-next-line max-len
scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_AUTHORIZATION_BY_TOKEN_REQUIRE, requireScope);

module.exports = {
  generate: generateAuthorization,
  generateByToken: generateAuthorizationByToken,
};
