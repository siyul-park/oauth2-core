const authorization = require('./authorization');

const scope = require('./scope');
const scopePool = require('../../scope/pool');
const ScopeType = require('../../scope/type');

scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND, scope);

module.exports = authorization;
