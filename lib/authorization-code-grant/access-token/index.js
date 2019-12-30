const generateAccessToken = require('./generate/access-token');

const requireScope = require('./scope/require');
const publicClientResponseScope = require('./scope/public-client/response');
const confidentialClientResponseScope = require('./scope/confidential-client/response');

const scopePool = require('../../scope/pool');
const ScopeType = require('../../scope/type');

scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_ACCESS_TOKEN.REQUIRE, requireScope);
// eslint-disable-next-line max-len
scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_ACCESS_TOKEN.RESPONSE.PUBLIC_CLIENT, publicClientResponseScope);
// eslint-disable-next-line max-len
scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_ACCESS_TOKEN.RESPONSE.CONFIDENTIAL_CLIENT, confidentialClientResponseScope);

module.exports = {
  generate: generateAccessToken,
};
