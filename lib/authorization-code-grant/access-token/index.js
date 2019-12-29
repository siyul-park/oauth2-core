const requestScope = require('./request-scope');
const scopePool = require('../../scope/pool');
const ScopeType = require('../../scope/type');

scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND_ACCESS_TOKEN_REQUEST, requestScope);
