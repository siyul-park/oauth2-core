const authorization = require('./authorization');

const responseScope = require('./response-scope');
const scopePool = require('../../scope/pool');
const ScopeType = require('../../scope/type');

scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND_RESPONSE, responseScope);

module.exports = authorization;
